import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { db } from "./src/db/index.ts";
import {
  users,
  inquiries,
  demoRequests,
  events,
  eventRegistrations,
  testimonials,
  chatSessions,
  chatMessages,
} from "./src/db/schema.ts";
import { eq, desc } from "drizzle-orm";
import { getOrCreateUser } from "./src/db/users.ts";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Wait for the Gemini API call to be properly handled
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  //
  // API Routes
  //

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Auth / Sync user
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { email, name } = req.body;
      const user = await getOrCreateUser(req.user!.uid, email);
      // We can also sync name if it's there
      if (name && !user.name) {
        await db.update(users).set({ name }).where(eq(users.id, user.id));
      }
      res.json({ success: true, user });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Inquiries
  app.post("/api/inquiries", async (req: AuthRequest, res) => {
    try {
      // Optional auth. Public form!
      const authHeader = req.headers.authorization;
      let uid = null;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
          const { adminAuth } = await import('./src/lib/firebase-admin.ts');
          const token = authHeader.split('Bearer ')[1];
          const decoded = await adminAuth.verifyIdToken(token);
          uid = decoded.uid;
        } catch (e) {
          // ignore
        }
      }

      let userId = null;
      if (uid) {
        const u = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
        if (u.length > 0) userId = u[0].id;
      }

      const val = req.body;
      const result = await db.insert(inquiries).values({
        userId,
        name: val.name,
        email: val.email,
        phone: val.phone,
        company: val.company,
        country: val.country,
        jobTitle: val.jobTitle,
        type: val.type,
        message: val.message,
      }).returning();
      res.json({ success: true, inquiry: result[0] });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  // Demo Requests
  app.post("/api/demo-requests", async (req: AuthRequest, res) => {
    try {
      // Optional auth like inquiries
      const authHeader = req.headers.authorization;
      let uid = null;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
          const { adminAuth } = await import('./src/lib/firebase-admin.ts');
          const token = authHeader.split('Bearer ')[1];
          const decoded = await adminAuth.verifyIdToken(token);
          uid = decoded.uid;
        } catch (e) {}
      }

      let userId = null;
      if (uid) {
        const u = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
        if (u.length > 0) userId = u[0].id;
      }

      const val = req.body;
      const result = await db.insert(demoRequests).values({
        userId,
        name: val.name,
        email: val.email,
        phone: val.phone,
        company: val.company,
        country: val.country,
        service: val.service,
        requirements: val.requirements,
        date: val.date,
      }).returning();
      res.json({ success: true, request: result[0] });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Failed to schedule demo" });
    }
  });

  // Events list
  app.get("/api/events", async (req, res) => {
    try {
      const allEvents = await db.select().from(events).orderBy(desc(events.date));
      res.json(allEvents);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.post("/api/events/register", async (req, res) => {
    try {
      const val = req.body;
      await db.insert(eventRegistrations).values({
        eventId: val.eventId,
        name: val.name,
        email: val.email,
        company: val.company,
        country: val.country,
      });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to register" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const all = await db.select().from(testimonials).orderBy(desc(testimonials.rating));
      res.json(all);
    } catch (error) {
      res.status(500).json({ error: "Failed to load testimonials" });
    }
  });

  //
  // AI Chat Assistant Routes
  //
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId, uid } = req.body;
      
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        const session = await db.insert(chatSessions).values({ uid: uid || "anonymous" }).returning();
        currentSessionId = session[0].id;
      }

      // Save user message
      await db.insert(chatMessages).values({
        sessionId: currentSessionId,
        role: "user",
        content: message,
      });

      // Get history
      const history = await db.select().from(chatMessages).where(eq(chatMessages.sessionId, currentSessionId)).orderBy(chatMessages.createdAt);

      const promptContext = `You are a helpful AI assistant for 'AI-Solutions', an enterprise AI platform company in Sunderland, UK.
      We provide AI Virtual Assistants, AI Software Solutions, AI Prototyping, and Digital Employee Experience automation.
      Answer questions concisely and professionally. If the user asks for a demo, guide them to the Schedule Demo page.
      Be friendly and use a modern, professional tone.`;

      const contents = history.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: promptContext }] },
          { role: "model", parts: [{ text: "Understood. I am the AI-Solutions virtual assistant." }] },
          ...contents,
        ],
      });

      const aiText = response.text || "I'm sorry, I'm having trouble responding right now.";

      // Save AI message
      await db.insert(chatMessages).values({
        sessionId: currentSessionId,
        role: "assistant",
        content: aiText,
      });

      res.json({ success: true, sessionId: currentSessionId, reply: aiText });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "AI failed to respond" });
    }
  });


  //
  // Admin Routes
  //
  app.get("/api/admin/stats", requireAuth, async (req: AuthRequest, res) => {
    try {
      const u = await db.select().from(users).where(eq(users.uid, req.user!.uid));
      if (!u.length || u[0].role !== "admin") {
        return res.status(403).json({ error: "Forbidden: Admin access required" });
      }

      const allInquiries = await db.select().from(inquiries);
      const allDemos = await db.select().from(demoRequests);
      const allEventsReg = await db.select().from(eventRegistrations);
      const allUsers = await db.select().from(users);
      const allChats = await db.select().from(chatSessions);

      res.json({
        inquiries: allInquiries,
        demos: allDemos,
        eventRegistrations: allEventsReg,
        users: allUsers,
        chatSessions: allChats,
      });
    } catch(err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Setup initial admin and test data
  app.post("/api/admin/setup", requireAuth, async (req: AuthRequest, res) => {
     try {
       // Make this user an admin
       await db.update(users).set({ role: 'admin' }).where(eq(users.uid, req.user!.uid));
       
       // Check if we need to seed events and testimonials
       const currentEvents = await db.select().from(events);
       if (currentEvents.length === 0) {
         await db.insert(events).values([
           { title: "AI Transforming the Workplace 2026", description: "Learn how the top 500 companies use AI to scale.", location: "London, UK", date: "2026-09-15" },
           { title: "Prototyping with AI masterclass", description: "A hands-on workshop to build an MVP in a weekend.", location: "Online", date: "2026-10-02" },
         ]);
       }

       const currentTestimonials = await db.select().from(testimonials);
       if (currentTestimonials.length === 0) {
         await db.insert(testimonials).values([
           { name: "Sarah Jenkins", company: "FinTech Global", rating: 5, comment: "AI-Solutions completely revamped our customer support workflow. The AI assistant resolved 40% of queries automatically." },
           { name: "David Chen", company: "HealthPlus", rating: 5, comment: "Their custom software development team operates with precision. We deployed our app 3 months ahead of schedule." },
           { name: "Amina Yusuf", company: "LogiTech Logistics", rating: 4, comment: "Incredible speed on our MVP prototype. It enabled us to secure series A funding instantly." }
         ]);
       }

       res.json({ success: true });
     } catch (err: any) {
       res.status(500).json({ error: err.message });
     }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // app.use(vite.middlewares); -> In Express v4, this works
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement
} from 'chart.js';
import { Users, FileText, Calendar, MessageSquare, Database, LogOut } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export function AdminDashboard() {
  const { user, login, logout, token, appUser } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setError('');
      } else {
        setError('Forbidden: Admin access required');
      }
    } catch (e) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [token]);

  const setupAdmin = async () => {
    if (!token) return;
    setLoading(true);
    await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    await fetchStats();
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-transparent">
        <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <Database className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400 text-sm mb-6">Restricted access area.</p>
          <button onClick={login} className="w-full py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen pt-24 text-center">Loading dashboard...</div>;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-transparent">
        <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <div className="space-y-3">
             <button onClick={setupAdmin} className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-secondary/90">
               Click here to setup Admin privileges (Demo)
             </button>
             <button onClick={logout} className="w-full py-2 border border-white/20 text-slate-300 rounded-lg text-sm hover:bg-transparent">
               Sign out
             </button>
          </div>
        </div>
      </div>
    );
  }

  // Analytics derivation
  const serviceCount: Record<string, number> = {};
  data.demos.forEach((d: any) => { serviceCount[d.service] = (serviceCount[d.service] || 0) + 1; });
  
  const countryCount: Record<string, number> = {};
  data.inquiries.forEach((i: any) => { if(i.country) countryCount[i.country] = (countryCount[i.country] || 0) + 1; });
  
  const barData = {
    labels: Object.keys(serviceCount),
    datasets: [{
      label: 'Requested Services',
      data: Object.values(serviceCount),
      backgroundColor: '#0070F3',
    }]
  };

  const pieData = {
    labels: Object.keys(countryCount),
    datasets: [{
      data: Object.values(countryCount),
      backgroundColor: ['#0A192F', '#0070F3', '#7928CA', '#F5A623', '#10B981'],
    }]
  };

  return (
    <div className="min-h-screen pt-20 bg-transparent pb-20">
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 text-white px-6 py-6 flex justify-between items-center sticky top-20 z-40 shadow-md">
        <div>
          <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-sm text-blue-200">Welcome back, {user.displayName}</p>
        </div>
        <button onClick={logout} className="flex items-center space-x-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition">
          <LogOut className="h-4 w-4" /> <span>Logout</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Inquiries', value: data.inquiries.length, icon: FileText, color: 'text-blue-500' },
            { label: 'Demo Reqs', value: data.demos.length, icon: Calendar, color: 'text-purple-500' },
            { label: 'Event Regs', value: data.eventRegistrations.length, icon: Users, color: 'text-green-500' },
            { label: 'AI Sessions', value: data.chatSessions.length, icon: MessageSquare, color: 'text-orange-500' },
            { label: 'Customers', value: data.users.length, icon: Database, color: 'text-slate-400' }
          ].map((kpi, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/10 flex flex-col justify-center items-center text-center">
              <kpi.icon className={`h-8 w-8 mb-2 ${kpi.color}`} />
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
              <div className="text-xs text-slate-400 font-medium uppercase font-display">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/10">
            <h3 className="font-bold text-white mb-4 font-display">Most Requested Services</h3>
            <div className="h-64"><Bar data={barData} options={{ maintainAspectRatio: false }} /></div>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/10">
            <h3 className="font-bold text-white mb-4 font-display">Customer Countries</h3>
            <div className="h-64 flex justify-center"><Pie data={pieData} options={{ maintainAspectRatio: false }} /></div>
          </div>
        </div>

        {/* Tables */}
        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-sm border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-transparent">
              <h3 className="font-bold text-white font-display">Recent Demo Bookings</h3>
              <button className="text-xs font-medium text-secondary hover:underline">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 backdrop-blur-md border-b text-slate-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Service</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.demos.slice(0,5).map((d: any) => (
                    <tr key={d.id} className="border-b hover:bg-transparent">
                      <td className="px-6 py-4 font-medium text-white">{d.name}</td>
                      <td className="px-6 py-4">{d.company}</td>
                      <td className="px-6 py-4 text-xs bg-blue-500/10 text-blue-400 rounded-full inline-block mt-3 ml-6 px-2 py-1">{d.service}</td>
                      <td className="px-6 py-4">{d.date}</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-500/10 text-yellow-300 rounded text-xs">{d.status}</span></td>
                    </tr>
                  ))}
                  {data.demos.length === 0 && <tr><td colSpan={5} className="px-6 py-4 text-center text-slate-400">No data available</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-sm border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-transparent">
              <h3 className="font-bold text-white font-display">Recent Inquiries</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 backdrop-blur-md border-b text-slate-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.inquiries.slice(0,5).map((d: any) => (
                    <tr key={d.id} className="border-b hover:bg-transparent">
                      <td className="px-6 py-4 font-medium text-white">{d.name}</td>
                      <td className="px-6 py-4">{d.email}</td>
                      <td className="px-6 py-4">{d.type}</td>
                      <td className="px-6 py-4">{new Date(d.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {data.inquiries.length === 0 && <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-400">No data available</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

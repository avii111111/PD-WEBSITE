export interface User {
  id: number;
  uid: string;
  email: string;
  name?: string;
  role: string;
}

export interface Inquiry {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  jobTitle?: string;
  type: string;
  message: string;
}

export interface DemoRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  service: string;
  requirements?: string;
  date: string;
}

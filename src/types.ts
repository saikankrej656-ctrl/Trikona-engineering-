export type ServiceCategory = 'all' | 'cad' | 'pcb' | '3d-printing';

export interface ClientReview {
  id: string;
  name: string;
  role?: string;
  company?: string;
  rating: number; // 1 to 5
  date: string;
  service: 'cad' | 'pcb' | '3d-printing';
  feedback: string;
  verified?: boolean;
}

export interface ServiceArticle {
  id: 'cad' | 'pcb' | '3d-printing';
  title: string;
  subtitle: string;
  shortDesc: string;
  image: string;
  turnaround: string;
  tolerances: string;
  deliverables: string[];
  articleSections: {
    heading: string;
    body: string;
    keyPoints?: string[];
  }[];
  specTable: {
    parameter: string;
    specification: string;
    standards: string;
  }[];
}

export interface ProjectInquiry {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  services: ('cad' | 'pcb' | '3d-printing')[];
  timeline: string;
  budgetRange: string;
  projectDescription: string;
  uploadedFiles: {
    name: string;
    size: string;
    type: string;
  }[];
}

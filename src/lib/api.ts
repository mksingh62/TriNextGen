// API utility functions for connecting frontend to backend

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${error}`);
    throw error;
  }
};

// Contact API functions
export const contactApi = {
  // Submit contact form
  submitContact: async (data: {
    name: string;
    email: string;
    company?: string;
    subject: string;
    message: string;
  }) => {
    return apiCall('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Service API functions
export const serviceApi = {
  // Get all services
  getAllServices: async () => {
    return apiCall('/api/services');
  },
  
  // Get service by ID
  getServiceById: async (id: string) => {
    return apiCall(`/api/services/${id}`);
  },
};

// Career API functions
export const careerApi = {
  // Get all career listings
  getAllCareers: async () => {
    return apiCall('/api/careers');
  },
  
  // Get career by ID
  getCareerById: async (id: string) => {
    return apiCall(`/api/careers/${id}`);
  },
  
  // Apply for a position
  applyForPosition: async (data: {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume?: string;
    jobId: string;
    jobTitle: string;
  }) => {
    return apiCall('/api/careers/apply', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Get all applications (admin only)
  getAllApplications: async (token: string) => {
    return apiCall('/api/careers/applications', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  
  // Update application status (admin only)
  updateApplicationStatus: async (token: string, applicationId: string, status: string) => {
    return apiCall(`/api/careers/applications/${applicationId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
  },
};

// Admin API functions
export const adminApi = {
  // Admin login
  login: async (credentials: { email: string; password: string }) => {
    return apiCall('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  // Get all contacts (protected)
  getAllContacts: async (token: string) => {
    return apiCall('/api/admin/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  
  // Get all services (protected)
  getAllServicesAdmin: async (token: string) => {
    return apiCall('/api/admin/services', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
  withCredentials: false // Enable credentials for all requests
});

// Request interceptor with more detailed logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Request Details:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response Details:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.error('Response error details:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper methods for common API calls
export const apiHelpers = {
  get: async (url: string) => {
    try {
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  },
  
  post: async (url: string, data: any) => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  },
  updateUserReportStatus: async (userId: number, isReported: boolean) => {
    try {
      const response = await apiClient.put(`/utilisateurs/${userId}`, {
        IsReported: isReported
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`PUT /utilisateurs/${userId} failed:`, error);
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await apiClient.get('/utilisateurs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error: any) {
      console.error('Count endpoint failed:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
      throw error;
    }
  },
  deleteUser: async (userId: number) => {
    try {
      const response = await apiClient.delete(`/utilisateurs/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`DELETE /utilisateurs/${userId} failed:`, error);
      throw error;
    }
  },
 // Updated count endpoint method
 getCount: async () => {
  try {
    const response = await apiClient.get('/utilisateurs/count', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Count endpoint failed:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    throw error;
  }
}
};


 // Updated count endpoint method
 



export default apiClient;
// API Service for Pinch of Luxe Events Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      console.log(`🌐 API Request: ${config.method || 'GET'} ${url}`);
      
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API Response:`, data);
      
      return {
        success: true,
        data,
        status: response.status,
      };
    } catch (error) {
      console.error(`❌ API Error:`, error);
      return {
        success: false,
        error: error.message,
        status: error.status || 500,
      };
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }

  // Contact form submission
  async submitContactForm(contactData) {
    return this.post('/api/contact', contactData);
  }

  // Inquiry form submission
  async submitInquiryForm(inquiryData) {
    return this.post('/api/inquiries', inquiryData);
  }

  // Get all inquiries (admin)
  async getInquiries() {
    return this.get('/api/inquiries');
  }

  // Get all contacts (admin)
  async getContacts() {
    return this.get('/api/contacts');
  }

  // Update inquiry status
  async updateInquiryStatus(id, status) {
    return this.patch(`/api/inquiries/${id}`, { status });
  }

  // Update contact status
  async updateContactStatus(id, status) {
    return this.patch(`/api/contacts/${id}`, { status });
  }

  // Delete inquiry
  async deleteInquiry(id) {
    return this.delete(`/api/inquiries/${id}`);
  }

  // Delete contact
  async deleteContact(id) {
    return this.delete(`/api/contacts/${id}`);
  }

  // Get gallery images
  async getGalleryImages() {
    return this.get('/api/gallery');
  }

  // Upload gallery image
  async uploadGalleryImage(formData) {
    return this.request('/api/gallery/upload', {
      method: 'POST',
      body: formData, // FormData for file upload
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Get videos
  async getVideos() {
    return this.get('/api/videos');
  }

  // Upload video
  async uploadVideo(formData) {
    return this.request('/api/videos/upload', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  }

  // Admin authentication
  async adminLogin(credentials) {
    return this.post('/api/admin/login', credentials);
  }

  // Get dashboard stats
  async getDashboardStats() {
    return this.get('/api/admin/stats');
  }

  // Newsletter subscription
  async subscribeNewsletter(email) {
    return this.post('/api/newsletter/subscribe', { email });
  }

  // Get testimonials
  async getTestimonials() {
    return this.get('/api/testimonials');
  }

  // Add testimonial
  async addTestimonial(testimonialData) {
    return this.post('/api/testimonials', testimonialData);
  }

  // Get services
  async getServices() {
    return this.get('/api/services');
  }

  // Update service
  async updateService(id, serviceData) {
    return this.put(`/api/services/${id}`, serviceData);
  }

  // Bulk operations
  async bulkUpdateInquiries(ids, status) {
    return this.patch('/api/inquiries/bulk', { ids, status });
  }

  async bulkDeleteInquiries(ids) {
    return this.delete('/api/inquiries/bulk', { ids });
  }

  async bulkUpdateContacts(ids, status) {
    return this.patch('/api/contacts/bulk', { ids, status });
  }

  async bulkDeleteContacts(ids) {
    return this.delete('/api/contacts/bulk', { ids });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  healthCheck,
  submitContactForm,
  submitInquiryForm,
  getInquiries,
  getContacts,
  updateInquiryStatus,
  updateContactStatus,
  deleteInquiry,
  deleteContact,
  getGalleryImages,
  uploadGalleryImage,
  getVideos,
  uploadVideo,
  adminLogin,
  getDashboardStats,
  subscribeNewsletter,
  getTestimonials,
  addTestimonial,
  getServices,
  updateService,
  bulkUpdateInquiries,
  bulkDeleteInquiries,
  bulkUpdateContacts,
  bulkDeleteContacts,
} = apiService;

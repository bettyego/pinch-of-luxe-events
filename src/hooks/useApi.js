import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

// Custom hook for API calls with loading, error, and success states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall(...args);
      
      if (response.success) {
        setData(response.data);
        return response;
      } else {
        setError(response.error);
        return response;
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, execute };
};

// Hook for form submissions
export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitForm = useCallback(async (apiCall, formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await apiCall(formData);
      
      if (response.success) {
        setSubmitSuccess(true);
        return response;
      } else {
        setSubmitError(response.error);
        return response;
      }
    } catch (err) {
      setSubmitError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetForm = useCallback(() => {
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    submitForm,
    resetForm,
  };
};

// Hook for real-time data fetching
export const useRealTimeData = (apiCall, interval = 30000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data);
        setError(null);
        setLastUpdated(new Date());
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
    
    const intervalId = setInterval(fetchData, interval);
    
    return () => clearInterval(intervalId);
  }, [fetchData, interval]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
};

// Hook for backend connection status
export const useBackendConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [checking, setChecking] = useState(true);

  const checkConnection = useCallback(async () => {
    setChecking(true);
    
    try {
      const response = await apiService.healthCheck();
      
      if (response.success) {
        setIsConnected(true);
        setConnectionError(null);
      } else {
        setIsConnected(false);
        setConnectionError(response.error);
      }
    } catch (err) {
      setIsConnected(false);
      setConnectionError(err.message);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const intervalId = setInterval(checkConnection, 30000);
    
    return () => clearInterval(intervalId);
  }, [checkConnection]);

  return { isConnected, connectionError, checking, checkConnection };
};

// Hook for admin data management
export const useAdminData = () => {
  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.getInquiries();
      if (response.success) {
        setInquiries(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.getContacts();
      if (response.success) {
        setContacts(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await apiService.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const updateInquiryStatus = useCallback(async (id, status) => {
    try {
      const response = await apiService.updateInquiryStatus(id, status);
      if (response.success) {
        setInquiries(prev => 
          prev.map(inquiry => 
            inquiry.id === id ? { ...inquiry, status } : inquiry
          )
        );
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const updateContactStatus = useCallback(async (id, status) => {
    try {
      const response = await apiService.updateContactStatus(id, status);
      if (response.success) {
        setContacts(prev => 
          prev.map(contact => 
            contact.id === id ? { ...contact, status } : contact
          )
        );
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const deleteInquiry = useCallback(async (id) => {
    try {
      const response = await apiService.deleteInquiry(id);
      if (response.success) {
        setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const deleteContact = useCallback(async (id) => {
    try {
      const response = await apiService.deleteContact(id);
      if (response.success) {
        setContacts(prev => prev.filter(contact => contact.id !== id));
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  return {
    inquiries,
    contacts,
    stats,
    loading,
    error,
    fetchInquiries,
    fetchContacts,
    fetchStats,
    updateInquiryStatus,
    updateContactStatus,
    deleteInquiry,
    deleteContact,
  };
};

export default useApi;

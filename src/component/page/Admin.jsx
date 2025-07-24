import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useAdminData } from '../../hooks/useApi';
import apiService from '../../services/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Weddings');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Utility Functions
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      new: 'bg-red-100 text-red-800 border-red-200',
      contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      replied: 'bg-blue-100 text-blue-800 border-blue-200',
      quoted: 'bg-purple-100 text-purple-800 border-purple-200',
      booked: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      resolved: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Check if user is already logged in
  useEffect(() => {
    const adminAuth = localStorage.getItem('pinch-of-luxe-admin-auth');
    if (adminAuth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // Enhanced mock data for demonstration
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        // Mock inquiries data with more comprehensive information
        setInquiries([
          {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 123-4567',
            eventType: 'Wedding',
            eventDate: '2024-08-15',
            guestCount: '150',
            budget: '$5000-$7500',
            venue: 'Garden Valley Resort',
            message: 'Looking for elegant balloon decorations for our outdoor wedding ceremony. We want a romantic, sophisticated look with gold and white colors.',
            date: '2024-01-15T10:30:00',
            status: 'new',
            priority: 'high',
            source: 'website'
          },
          {
            id: 2,
            name: 'Mike Chen',
            email: 'mike.chen@email.com',
            phone: '+1 (555) 987-6543',
            eventType: 'Birthday',
            eventDate: '2024-07-20',
            guestCount: '50',
            budget: '$1000-$2500',
            venue: 'Home backyard',
            message: 'Planning a surprise 30th birthday party with balloon arch. Theme is tropical/summer vibes.',
            date: '2024-01-14T14:20:00',
            status: 'contacted',
            priority: 'medium',
            source: 'referral'
          },
          {
            id: 3,
            name: 'Lisa Rodriguez',
            email: 'lisa.r@email.com',
            phone: '+1 (555) 555-0123',
            eventType: 'Baby Shower',
            eventDate: '2024-06-10',
            guestCount: '30',
            budget: '$500-$1000',
            venue: 'Community Center',
            message: 'Gender reveal baby shower. Looking for pink and blue balloon arrangements.',
            date: '2024-01-13T09:15:00',
            status: 'quoted',
            priority: 'medium',
            source: 'social_media'
          },
          {
            id: 4,
            name: 'Corporate Solutions Inc',
            email: 'events@corpsolutions.com',
            phone: '+1 (555) 888-9999',
            eventType: 'Corporate Event',
            eventDate: '2024-05-25',
            guestCount: '200',
            budget: '$3000-$5000',
            venue: 'Downtown Convention Center',
            message: 'Annual company celebration. Need professional balloon installations in company colors (blue and silver).',
            date: '2024-01-12T16:45:00',
            status: 'booked',
            priority: 'high',
            source: 'direct_call'
          },
          {
            id: 5,
            name: 'Jennifer Martinez',
            email: 'jen.martinez@email.com',
            phone: '+1 (555) 777-1234',
            eventType: 'Kids Party',
            eventDate: '2024-04-18',
            guestCount: '25',
            budget: '$300-$600',
            venue: 'Local park pavilion',
            message: 'My daughter\'s 8th birthday. She loves unicorns and rainbows!',
            date: '2024-01-11T11:30:00',
            status: 'completed',
            priority: 'low',
            source: 'website'
          }
        ]);

        // Mock contacts data with more variety
        setContacts([
          {
            id: 1,
            name: 'Emma Wilson',
            email: 'emma.wilson@email.com',
            phone: '+1 (555) 456-7890',
            subject: 'Corporate Event Inquiry',
            message: 'What are your rates for corporate events? We have a quarterly meeting coming up and would like balloon decorations.',
            date: '2024-01-16T13:20:00',
            status: 'new',
            category: 'pricing'
          },
          {
            id: 2,
            name: 'David Brown',
            email: 'david.brown@email.com',
            phone: '+1 (555) 321-0987',
            subject: 'Baby Shower Services',
            message: 'Do you provide services for baby shower decorations? What packages do you offer?',
            date: '2024-01-15T08:45:00',
            status: 'replied',
            category: 'services'
          },
          {
            id: 3,
            name: 'Amanda Foster',
            email: 'amanda.f@email.com',
            phone: '+1 (555) 654-3210',
            subject: 'Wedding Consultation',
            message: 'I saw your work on Instagram and I\'m interested in a consultation for my wedding next year.',
            date: '2024-01-14T19:30:00',
            status: 'new',
            category: 'consultation'
          },
          {
            id: 4,
            name: 'Robert Kim',
            email: 'robert.kim@email.com',
            phone: '+1 (555) 111-2222',
            subject: 'Delivery Question',
            message: 'Do you deliver to locations outside the city? I need decorations for an event 50 miles away.',
            date: '2024-01-13T15:10:00',
            status: 'resolved',
            category: 'logistics'
          }
        ]);

        setIsLoading(false);
        showNotification('Data loaded successfully!');
      }, 1000);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication (in production, use proper authentication)
    if (loginData.username === 'admin' && loginData.password === 'pinchofLuxe2024') {
      setIsAuthenticated(true);
      localStorage.setItem('pinch-of-luxe-admin-auth', 'authenticated');
    } else {
      alert('Invalid credentials. Please check your username and password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pinch-of-luxe-admin-auth');
    navigate('/');
  };

  // Enhanced data management functions
  const updateStatus = (type, id, newStatus) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (type === 'inquiry') {
        setInquiries(prev => prev.map(item =>
          item.id === id ? { ...item, status: newStatus, lastUpdated: new Date().toISOString() } : item
        ));
      } else {
        setContacts(prev => prev.map(item =>
          item.id === id ? { ...item, status: newStatus, lastUpdated: new Date().toISOString() } : item
        ));
      }
      setIsLoading(false);
      showNotification(`Status updated to ${newStatus}`, 'success');
    }, 500);
  };

  const deleteItem = (type, id) => {
    setIsLoading(true);

    setTimeout(() => {
      if (type === 'inquiry') {
        setInquiries(prev => prev.filter(item => item.id !== id));
      } else {
        setContacts(prev => prev.filter(item => item.id !== id));
      }
      setIsLoading(false);
      setShowDeleteModal(false);
      setItemToDelete(null);
      showNotification('Item deleted successfully', 'success');
    }, 500);
  };

  const bulkDelete = () => {
    setIsLoading(true);

    setTimeout(() => {
      if (activeTab === 'inquiries') {
        setInquiries(prev => prev.filter(item => !selectedItems.includes(item.id)));
      } else if (activeTab === 'contacts') {
        setContacts(prev => prev.filter(item => !selectedItems.includes(item.id)));
      }
      setSelectedItems([]);
      setIsLoading(false);
      showNotification(`${selectedItems.length} items deleted`, 'success');
    }, 500);
  };

  const bulkUpdateStatus = (newStatus) => {
    setIsLoading(true);

    setTimeout(() => {
      const updateTime = new Date().toISOString();
      if (activeTab === 'inquiries') {
        setInquiries(prev => prev.map(item =>
          selectedItems.includes(item.id)
            ? { ...item, status: newStatus, lastUpdated: updateTime }
            : item
        ));
      } else if (activeTab === 'contacts') {
        setContacts(prev => prev.map(item =>
          selectedItems.includes(item.id)
            ? { ...item, status: newStatus, lastUpdated: updateTime }
            : item
        ));
      }
      setSelectedItems([]);
      setIsLoading(false);
      showNotification(`${selectedItems.length} items updated to ${newStatus}`, 'success');
    }, 500);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    const currentData = activeTab === 'inquiries' ? inquiries : contacts;
    const filteredData = getFilteredData(currentData);
    const allIds = filteredData.map(item => item.id);

    if (selectedItems.length === allIds.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allIds);
    }
  };

  // Search and filter functions
  const getFilteredData = (data) => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.eventType && item.eventType.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const getStatusOptions = (type) => {
    if (type === 'inquiry') {
      return ['new', 'contacted', 'quoted', 'booked', 'completed'];
    } else {
      return ['new', 'replied', 'resolved'];
    }
  };

  const getStats = () => {
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(i => i.status === 'new').length;
    const totalContacts = contacts.length;
    const newContacts = contacts.filter(c => c.status === 'new').length;
    const bookedEvents = inquiries.filter(i => i.status === 'booked').length;
    const completedEvents = inquiries.filter(i => i.status === 'completed').length;

    return {
      totalInquiries,
      newInquiries,
      totalContacts,
      newContacts,
      bookedEvents,
      completedEvents,
      conversionRate: totalInquiries > 0 ? Math.round((bookedEvents / totalInquiries) * 100) : 0
    };
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#006400] to-[#32CD32] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#006400] mb-2">Pinch of Luxe Events Admin</h1>
            <p className="text-gray-600">Sign in to access the dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#006400] text-white py-3 rounded-lg font-semibold hover:bg-[#004d00] transition-colors duration-300"
            >
              Sign In
            </button>
          </form>
          

        </div>
      </div>
    );
  }

  // Admin Dashboard
  const stats = getStats();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 ${
              activeTab === 'inquiries'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inquiries
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 ${
              activeTab === 'contacts'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 ${
              activeTab === 'gallery'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Gallery
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard stats={stats} />}
        {activeTab === 'inquiries' && <InquiriesTab />}
        {activeTab === 'contacts' && <ContactsTab />}
        {activeTab === 'gallery' && <GalleryManagement />}
      </main>

      {/* Modals */}
      {uploadModalOpen && <UploadModal />}
      {showDeleteModal && <DeleteConfirmationModal />}
      {showDetailModal && <DetailModal />}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        } animate-slide-in`}>
          <div className="flex items-center space-x-2">
            <span>{notification.type === 'success' ? '✅' : '❌'}</span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#006400]"></div>
            <span className="text-gray-700">Processing...</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => deleteItem(itemToDelete.type, itemToDelete.id)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setItemToDelete(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">{selectedDetail.name}</h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedDetail(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{selectedDetail.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{selectedDetail.phone}</p>
                </div>
                {selectedDetail.eventType && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Event Type</label>
                      <p className="text-gray-900">{selectedDetail.eventType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Event Date</label>
                      <p className="text-gray-900">{selectedDetail.eventDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Guest Count</label>
                      <p className="text-gray-900">{selectedDetail.guestCount}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Budget</label>
                      <p className="text-gray-900">{selectedDetail.budget}</p>
                    </div>
                    {selectedDetail.venue && (
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-gray-500">Venue</label>
                        <p className="text-gray-900">{selectedDetail.venue}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedDetail.message}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(selectedDetail.status)}`}>
                  {selectedDetail.status}
                </span>
                <span className="text-sm text-gray-500">
                  Received: {formatDate(selectedDetail.date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#006400]">Pinch of Luxe Events Admin Dashboard</h1>
              <p className="text-gray-600">Manage your event planning business</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome back, Admin
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'inquiries', name: 'Event Inquiries', icon: '📝' },
              { id: 'contacts', name: 'Contact Messages', icon: '💬' },
              { id: 'analytics', name: 'Analytics', icon: '📈' },
              { id: 'gallery', name: 'Gallery Management', icon: '🖼️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#006400] text-white'
                    : 'text-gray-600 hover:text-[#006400] hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                    <p className="text-3xl font-bold text-red-600">{stats.newInquiries}</p>
                    <p className="text-xs text-gray-500">of {stats.totalInquiries} total</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Contacts</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.newContacts}</p>
                    <p className="text-xs text-gray-500">of {stats.totalContacts} total</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Booked Events</p>
                    <p className="text-3xl font-bold text-green-600">{stats.bookedEvents}</p>
                    <p className="text-xs text-gray-500">{stats.conversionRate}% conversion</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.completedEvents}</p>
                    <p className="text-xs text-gray-500">events finished</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="p-4 bg-[#006400] text-white rounded-lg hover:bg-[#004d00] transition-colors text-left"
                >
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-semibold">Review Inquiries</div>
                  <div className="text-sm opacity-90">{stats.newInquiries} new items</div>
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="p-4 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8860b] transition-colors text-left"
                >
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-semibold">Check Messages</div>
                  <div className="text-sm opacity-90">{stats.newContacts} new messages</div>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold">View Analytics</div>
                  <div className="text-sm opacity-90">Business insights</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[...inquiries, ...contacts]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                         onClick={() => {
                           setSelectedDetail(item);
                           setShowDetailModal(true);
                         }}>
                      <span className="text-2xl">
                        {item.eventType ? '📝' : '💬'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">
                          {item.eventType ? 'New inquiry' : 'Contact message'} from {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.eventType ? `${item.eventType} event` : item.subject || 'General inquiry'} - {formatDate(item.date)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Event Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  />
                </div>
                <div className="flex flex-wrap items-center space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  >
                    <option value="all">All Status</option>
                    {getStatusOptions('inquiry').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="eventType">Sort by Event Type</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedItems.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">
                      {selectedItems.length} item(s) selected
                    </span>
                    <div className="flex space-x-2">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            bulkUpdateStatus(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="text-sm px-3 py-1 border border-blue-300 rounded"
                      >
                        <option value="">Update Status</option>
                        {getStatusOptions('inquiry').map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <button
                        onClick={bulkDelete}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete Selected
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Event Inquiries</h3>
                    <p className="text-gray-600">
                      {getFilteredData(inquiries).length} of {inquiries.length} inquiries
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                      setSortBy('date');
                      setSortOrder('desc');
                    }}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedItems.length === getFilteredData(inquiries).length && getFilteredData(inquiries).length > 0}
                          onChange={selectAllItems}
                          className="rounded border-gray-300 text-[#006400] focus:ring-[#006400]"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getFilteredData(inquiries).map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(inquiry.id)}
                            onChange={() => toggleSelectItem(inquiry.id)}
                            className="rounded border-gray-300 text-[#006400] focus:ring-[#006400]"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="cursor-pointer" onClick={() => {
                            setSelectedDetail(inquiry);
                            setShowDetailModal(true);
                          }}>
                            <p className="font-medium text-gray-900 hover:text-[#006400]">{inquiry.name}</p>
                            <p className="text-sm text-gray-600">{inquiry.email}</p>
                            <p className="text-sm text-gray-600">{inquiry.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{inquiry.eventType}</p>
                            <p className="text-sm text-gray-600">{inquiry.guestCount} guests</p>
                            {inquiry.venue && <p className="text-xs text-gray-500">{inquiry.venue}</p>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{inquiry.eventDate}</p>
                            <p className="text-xs text-gray-500">Received: {formatDate(inquiry.date)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{inquiry.budget}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                          {inquiry.priority && (
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              inquiry.priority === 'high' ? 'bg-red-100 text-red-800' :
                              inquiry.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {inquiry.priority}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <select
                              value={inquiry.status}
                              onChange={(e) => updateStatus('inquiry', inquiry.id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#006400]"
                            >
                              {getStatusOptions('inquiry').map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => {
                                setItemToDelete({ type: 'inquiry', id: inquiry.id });
                                setShowDeleteModal(true);
                              }}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {getFilteredData(inquiries).length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Messages */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  />
                </div>
                <div className="flex flex-wrap items-center space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  >
                    <option value="all">All Status</option>
                    {getStatusOptions('contact').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedItems.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">
                      {selectedItems.length} item(s) selected
                    </span>
                    <div className="flex space-x-2">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            bulkUpdateStatus(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="text-sm px-3 py-1 border border-blue-300 rounded"
                      >
                        <option value="">Update Status</option>
                        {getStatusOptions('contact').map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <button
                        onClick={bulkDelete}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete Selected
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contacts List */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Contact Messages</h3>
                    <p className="text-gray-600">
                      {getFilteredData(contacts).length} of {contacts.length} messages
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                      setSortBy('date');
                      setSortOrder('desc');
                    }}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {getFilteredData(contacts).length > 0 ? (
                  getFilteredData(contacts).map((contact) => (
                    <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(contact.id)}
                          onChange={() => toggleSelectItem(contact.id)}
                          className="mt-1 rounded border-gray-300 text-[#006400] focus:ring-[#006400]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div className="cursor-pointer" onClick={() => {
                              setSelectedDetail(contact);
                              setShowDetailModal(true);
                            }}>
                              <h4 className="font-semibold text-gray-900 hover:text-[#006400]">{contact.name}</h4>
                              <p className="text-sm text-gray-600">{contact.email} • {contact.phone}</p>
                              <p className="text-sm text-gray-500">{formatDate(contact.date)}</p>
                              {contact.subject && (
                                <p className="text-sm font-medium text-[#006400] mt-1">{contact.subject}</p>
                              )}
                              {contact.category && (
                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mt-2">
                                  {contact.category}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(contact.status)}`}>
                                {contact.status}
                              </span>
                              <select
                                value={contact.status}
                                onChange={(e) => updateStatus('contact', contact.id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#006400]"
                              >
                                {getStatusOptions('contact').map(status => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => {
                                  setItemToDelete({ type: 'contact', id: contact.id });
                                  setShowDeleteModal(true);
                                }}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{contact.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#006400]">1,234</p>
                  <p className="text-gray-600">Page Views</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#006400]">456</p>
                  <p className="text-gray-600">Unique Visitors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#006400]">12%</p>
                  <p className="text-gray-600">Conversion Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Wedding Decorations</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#006400] h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Birthday Parties</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#006400] h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Corporate Events</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#006400] h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Gallery Upload Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Images</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center h-12 px-4 bg-[#006400] text-white rounded-lg cursor-pointer hover:bg-[#004d00] transition-colors"
                  >
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : 'Select Images'}
                  </label>
                </div>
                <button
                  onClick={handleUpload}
                  className="mt-4 sm:mt-0 h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Images
                </button>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                >
                  <option value="Weddings">Weddings</option>
                  <option value="Birthdays">Birthdays</option>
                  <option value="Corporate Events">Corporate Events</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Gallery Images Display */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="text-white text-sm font-semibold px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {galleryImages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📸</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No images in gallery</h3>
                  <p className="text-gray-600">Upload images to display them here.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">Upload Images</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="Weddings">Weddings</option>
                <option value="Birthdays">Birthdays</option>
                <option value="Baby Showers">Baby Showers</option>
                <option value="Corporate Events">Corporate Events</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Select Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full p-2 border rounded-lg"
              />
              {selectedFiles.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectedFiles.length} files selected
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Admin;

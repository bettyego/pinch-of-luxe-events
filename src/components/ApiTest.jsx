import React, { useState } from 'react';
import apiService from '../services/api';

const ApiTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    setTestResults([]);
    
    const tests = [
      {
        name: 'Health Check',
        test: () => apiService.healthCheck()
      },
      {
        name: 'Test Contact Form',
        test: () => apiService.submitContactForm({
          name: 'Test User',
          email: 'test@example.com',
          phone: '+1234567890',
          message: 'This is a test message from the frontend.',
          submittedAt: new Date().toISOString(),
          source: 'api-test'
        })
      },
      {
        name: 'Test Inquiry Form',
        test: () => apiService.submitInquiryForm({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '+1234567890',
          eventType: 'Wedding',
          eventDate: '2024-12-25',
          guestCount: '100',
          budget: '$5000-$7500',
          message: 'This is a test inquiry from the frontend.',
          submittedAt: new Date().toISOString(),
          source: 'api-test'
        })
      },
      {
        name: 'Get Inquiries',
        test: () => apiService.getInquiries()
      },
      {
        name: 'Get Contacts',
        test: () => apiService.getContacts()
      }
    ];

    for (const test of tests) {
      try {
        console.log(`🧪 Running test: ${test.name}`);
        const result = await test.test();
        
        setTestResults(prev => [...prev, {
          name: test.name,
          success: result.success,
          data: result.data,
          error: result.error,
          status: result.status
        }]);
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        setTestResults(prev => [...prev, {
          name: test.name,
          success: false,
          error: error.message,
          status: 'error'
        }]);
      }
    }
    
    setTesting(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">API Test Panel</h3>
        <button
          onClick={runTests}
          disabled={testing}
          className={`px-4 py-2 rounded text-sm font-medium ${
            testing 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {testing ? 'Testing...' : 'Run Tests'}
        </button>
      </div>
      
      {testing && (
        <div className="flex items-center space-x-2 mb-4">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Running API tests...</span>
        </div>
      )}
      
      <div className="max-h-64 overflow-y-auto space-y-2">
        {testResults.map((result, index) => (
          <div key={index} className={`p-3 rounded text-sm ${
            result.success 
              ? 'bg-green-100 border border-green-300 text-green-800' 
              : 'bg-red-100 border border-red-300 text-red-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{result.name}</span>
              <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                {result.success ? '✅' : '❌'}
              </span>
            </div>
            {result.error && (
              <div className="text-xs mt-1 opacity-75">{result.error}</div>
            )}
            {result.success && result.data && (
              <div className="text-xs mt-1 opacity-75">
                Status: {result.status} | Data received
              </div>
            )}
          </div>
        ))}
      </div>
      
      {testResults.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            {testResults.filter(r => r.success).length} / {testResults.length} tests passed
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;

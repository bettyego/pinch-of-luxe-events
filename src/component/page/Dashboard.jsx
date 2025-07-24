import React from 'react';

const Dashboard = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Statistics Cards */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Inquiries Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Inquiries</span>
            <span className="text-2xl font-bold text-green-600">{stats.totalInquiries}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">New Inquiries</span>
            <span className="text-2xl font-bold text-blue-600">{stats.newInquiries}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Conversion Rate</span>
            <span className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Events Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Booked Events</span>
            <span className="text-2xl font-bold text-yellow-600">{stats.bookedEvents}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Completed Events</span>
            <span className="text-2xl font-bold text-green-600">{stats.completedEvents}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Requests</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Contacts</span>
            <span className="text-2xl font-bold text-green-600">{stats.totalContacts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">New Messages</span>
            <span className="text-2xl font-bold text-blue-600">{stats.newContacts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

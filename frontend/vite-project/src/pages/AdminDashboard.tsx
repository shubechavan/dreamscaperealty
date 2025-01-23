import React from 'react';

import { Link } from "react-router-dom"

function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>
      <div className="mt-4 space-y-2">
        <Link to="/properties" className="block text-blue-500 hover:underline">
          Manage Properties
        </Link>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add New Property</button>
      </div>
    </div>
  )
}

export default AdminDashboard


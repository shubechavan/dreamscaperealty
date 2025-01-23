import React from 'react';
function UserDashboard() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
        <p>Welcome to your dashboard!</p>
        <div className="mt-4 space-y-2">
          <a href="/properties" className="block text-blue-500 hover:underline">
            View Properties
          </a>
          <a href="/purchased-properties" className="block text-blue-500 hover:underline">
            View Purchased Properties
          </a>
        </div>
      </div>
    )
  }
  
  export default UserDashboard
  
  
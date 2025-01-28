import React, { useState, useEffect } from "react"
import axios from "axios"

function UserDashboard() {
  const [purchasedProperties, setPurchasedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPurchasedProperties = async () => {
      try {
        const token = localStorage.getItem("userToken")
        const response = await axios.get("/api/user/purchased-property", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setPurchasedProperties(response.data.properties)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch purchased properties. Please try again later.")
        setLoading(false)
      }
    }

    fetchPurchasedProperties()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">Your Purchased Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedProperties.map((property) => (
          <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={property.imagelink || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <p className="text-gray-600 mb-2">{property.description.substring(0, 100)}...</p>
              <p className="text-blue-600 font-bold mb-2">${property.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDashboard


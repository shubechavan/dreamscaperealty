import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function SingleProperty() {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/property/${id}`)
        setProperty(response.data.property)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch property details. Please try again later.")
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (!property) return <div className="text-center py-10">Property not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <p className="text-gray-600 mb-4">{property.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${property.price.toLocaleString()}</p>
          <p className="mb-2">
            <strong>Address:</strong> {property.address}
          </p>
          <p className="mb-2">
            <strong>City:</strong> {property.city}
          </p>
          <p className="mb-2">
            <strong>Country:</strong> {property.country}
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Facilities:</h3>
            <p>
              <strong>Bathrooms:</strong> {property.facilities.bathrooms}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.facilities.bedrooms}
            </p>
            <p>
              <strong>Parking:</strong> {property.facilities.parking}
            </p>
          </div>
          <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProperty


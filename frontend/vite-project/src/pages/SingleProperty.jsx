import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import React from "react"
function SingleProperty() {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/properties/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch property details")
        }
        const data = await response.json()
        setProperty(data)
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
            src={property.imageUrl || "/placeholder.svg?height=400&width=600"}
            alt={property.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <p className="text-gray-600 mb-4">{property.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${property.price.toLocaleString()}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold">Bedrooms</h3>
              <p>{property.bedrooms}</p>
            </div>
            <div>
              <h3 className="font-semibold">Bathrooms</h3>
              <p>{property.bathrooms}</p>
            </div>
            <div>
              <h3 className="font-semibold">Square Feet</h3>
              <p>{property.squareFeet}</p>
            </div>
            <div>
              <h3 className="font-semibold">Year Built</h3>
              <p>{property.yearBuilt}</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProperty


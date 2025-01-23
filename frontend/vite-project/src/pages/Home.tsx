import { Link } from "react-router-dom"
import React from "react"
function Home() {
  return (
    <div>
      <section className="p-12 text-center bg-gradient-to-r from-blue-200 to-purple-500 lg:p-56">
        <h1 className="mb-2 text-2xl font-bold text-gray-700 lg:text-5xl">Find Your Dream Home</h1>
        <p className="mb-8 text-lg text-center text-gray-700">
        Discover a wide variety of properties that suit your style and budget. Whether you're looking for a cozy apartment or a luxurious family home, we've got something for everyone. Explore our listings and find the perfect place to call home today.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Link
            to="/properties"
            className="px-2 py-2 text-gray-800 text-gray-900 bg-gray-300 border rounded rounded-lg lg:px-8 lg:py-3 hover:bg-gray-200 hover:shadow"
          >
            View Properties
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 text-yellow-900 transition duration-300 bg-yellow-400 border border-gray-600 rounded-lg lg:px-8 lg:py-3 hover:bg-yellow-300 hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </section>
      <div className="text-center">
        {/* <h1 className="text-4xl font-bold mb-4">Welcome to Dreamscape Realty</h1>
      <p className="text-xl mb-8">Find your dream home today!</p> */}
        <div className="space-x-4">
          {/* <Link to="/properties" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Properties
        </Link> */}
         {/* <Link to="/user/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            User Login
          </Link>
          <Link to="/admin/login" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Admin Login
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Home


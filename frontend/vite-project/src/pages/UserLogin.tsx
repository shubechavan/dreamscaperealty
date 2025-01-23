import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { userApi } from "/Dreamscape reality/services/api"
import React from "react"
function UserLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await userApi.signin(credentials)
      if (response.token) {
        localStorage.setItem("userToken", response.token)
        navigate("/user/dashboard")
      } else {
        setError("Login failed. Please check your credentials.")
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">User Login</h3>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
              <Link to="/user/register" className="text-sm text-blue-600 hover:underline">
                Create account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin


import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { adminApi } from "/Dreamscape reality/services/api"

function AdminRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const { username, email, password, adminCode } = formData
      const response = await adminApi.signup({ username, email, password, adminCode })

      if (response.token) {
        navigate("/admin/login")
      } else {
        setError(response.message || "Registration failed")
      }
    } catch (err) {
      setError("An error occurred during registration")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-4">Create Admin Account</h3>
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
                id="username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.email}
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
                id="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="adminCode">
                Admin Registration Code
              </label>
              <input
                type="text"
                placeholder="Enter admin registration code"
                name="adminCode"
                id="adminCode"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.adminCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between mt-6">
              <button type="submit" className="w-full px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
                Register as Admin
              </button>
            </div>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to="/admin/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminRegister


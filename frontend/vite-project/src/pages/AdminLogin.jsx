import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const response = await axios.post("/api/admin/signin", formData)
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token)
        localStorage.setItem("adminEmail", formData.email)
        navigate("/admin/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError(error.response?.data?.msg || "An error occurred during login")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between p-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          ← BACK
        </Link>
      </div>

      <div className="max-w-[500px] mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X2Fm5RA5MqKBdCkbbLYn0bWtCeekD0.png"
            alt="Dreamscape Realty Logo"
            className="h-20 w-auto"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-8">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm uppercase mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-300 focus:border-gray-900 outline-none"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm uppercase mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:border-gray-900 outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-gray-100 text-gray-900 py-3 rounded hover:bg-gray-200 transition-colors"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin


import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
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
    try {
      const response = await fetch("/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.token) {
        localStorage.setItem("adminToken", data.token)
        navigate("/admin/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between p-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          ← BACK
        </Link>
        <Link to="/admin/register" className="text-gray-600 hover:text-gray-900">
          CREATE ADMIN ACCOUNT
        </Link>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-07-14_at_14.48.13_6a45f127-removebg-gJJvyU2V484RGIQT5DEYeT3E7HwC4O.png"
            alt="Dreamscape Realty Logo"
            className="h-20 w-auto"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-8">Admin Login - Dreamscape Realty</h1>

        <div className="max-w-[400px] mx-auto">
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

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors"
            >
              LOG IN AS ADMIN
            </button>
          </form>

          <div className="text-center mt-8">
            <Link to="/admin/forgot-password" className="text-blue-600 hover:underline">
              CAN'T LOG IN?
            </Link>
            <div className="mt-4 text-sm text-gray-500">
              Secure Admin Login with reCAPTCHA subject to Google
              <div className="space-x-2">
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms
                </a>
                <span>&</span>
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin


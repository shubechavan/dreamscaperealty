import React, { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    const storedUsername = localStorage.getItem("username")
    if (token && storedUsername) {
      setIsAuthenticated(true)
      setUsername(storedUsername)
    }
  }, [])

  const login = (token, username) => {
    localStorage.setItem("userToken", token)
    localStorage.setItem("username", username)
    setIsAuthenticated(true)
    setUsername(username)
  }

  const logout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("username")
    setIsAuthenticated(false)
    setUsername(null)
  }

  return <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>{children}</AuthContext.Provider>
}


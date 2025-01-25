const BASE_URL = "http://localhost:3000"

export const adminApi = {
  signup: async (formData) => {
    const response = await fetch(`${BASE_URL}/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    return response.json()
  },

  signin: async (credentials) => {
    const response = await fetch(`${BASE_URL}/admin/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
    return response.json()
  },

  createProperty: async (propertyData, token) => {
    const response = await fetch(`${BASE_URL}/admin/property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    })
    return response.json()
  },

  getAllProperties: async (token) => {
    const response = await fetch(`${BASE_URL}/admin/property`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  updateProperty: async (propertyId, propertyData, token) => {
    const response = await fetch(`${BASE_URL}/admin/property/${propertyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    })
    return response.json()
  },

  deleteProperty: async (propertyId, token) => {
    const response = await fetch(`${BASE_URL}/admin/property/${propertyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },
}

export const userApi = {
  signup: async (formData) => {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    return response.json()
  },

  signin: async (credentials) => {
    const response = await fetch(`${BASE_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
    return response.json()
  },

  getAllProperties: async () => {
    const response = await fetch(`${BASE_URL}/user/property`)
    return response.json()
  },

  purchaseProperty: async (propertyId, token) => {
    const response = await fetch(`${BASE_URL}/user/property/${propertyId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  getPurchasedProperties: async (token) => {
    const response = await fetch(`${BASE_URL}/user/purchasedProperty`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
    
  },
  
}


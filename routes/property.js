import { Router } from "express"
const router = Router()
import { Property } from "../db/index"

router.get("/:id", async (req, res) => {
    try {
      const property = await Property.findById(req.params.id)
      if (!property) {
        return res.status(404).json({ success: false, message: "Property not found" })
      }
      res.json({ success: true, property })
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
  })
  
  

export default router


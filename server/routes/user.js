import express from "express"
import { login } from "../services/services.js"
const router = express.Router()

router.post('/', login)

export default router
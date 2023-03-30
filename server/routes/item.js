import express from "express"
import { getitems } from "../services/services.js"

const router = express.Router()

router.get('/:id', getitems)

export default router
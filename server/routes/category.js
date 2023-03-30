import express from "express"
import { deleteSubCate, getCateAndSubcategory, updateSubCates, createSubCates, deleteCate, updateCates, createCates } from "../services/services.js"

const router = express.Router()

// file need to go to localhost:8080/posts first
// here, the path is localhost:8080/posts
router.get('/', getCateAndSubcategory)

// category
router.post('/', createCates)
router.patch('/', updateCates)
router.delete('/:id', deleteCate)

// subcates
router.post('/subcates', createSubCates)
router.patch('/subcates', updateSubCates)
router.delete('/subcates/:id', deleteSubCate)



export default router
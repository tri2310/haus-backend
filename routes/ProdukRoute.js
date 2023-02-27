import express from "express";
import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProdukController.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";
 
const router = express.Router();
 
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', verifyUser, adminOnly, saveProduct);
router.patch('/products/:id', verifyUser, adminOnly, updateProduct);
router.delete('/products/:id',verifyUser, adminOnly,  deleteProduct);
 
export default router;
import express from "express";
import {
    getKupon,
    getKuponById,
    saveKupon,
    updateKupon,
    deleteKupon
} from "../controllers/KuponController.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

 
const router = express.Router();
 
router.get('/kupon', getKupon);
router.get('/kupon/:id', getKuponById);
router.post('/kupon', verifyUser, adminOnly, saveKupon);
router.patch('/kupon/:id', verifyUser, adminOnly, updateKupon);
router.delete('/kupon/:id',verifyUser, adminOnly,  deleteKupon);
 
export default router;
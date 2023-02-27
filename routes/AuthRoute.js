import express from "express";
import {Login, Logout, hasLogin} from '../controllers/Auth.js';


const router = express.Router();

//route
router.get('/haslogin', hasLogin);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;
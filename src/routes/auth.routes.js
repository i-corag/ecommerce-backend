import { Router } from 'express';
import {
  userLogIn,
  isLoggedIn,
  userLogOut,
} from '../controllers/auth.controllers.js';

const router = Router();

//LOG IN
router.post('/login', userLogIn);

//CHECK IF SOMEONE IS LOGGED IN
router.get('/login', isLoggedIn);

//LOG OUT
router.get('/logout', userLogOut);

export default router;

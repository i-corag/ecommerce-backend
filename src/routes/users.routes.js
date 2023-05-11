import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controllers.js';

const router = Router();
//CREATE USER
router.post('/create', createUser);

//READ USERS
router.get('/', getUsers);

//READ A SPECIFIC USER
router.get('/:id', getUser);

//UPDATE USER
router.put('/update/:id', updateUser);

//DELETE USER
router.delete('/delete/:id', deleteUser);

export default router;

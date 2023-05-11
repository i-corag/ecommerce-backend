import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User.model.js';

const createUser = async (user) => {
  let newUser = await User.findAll({
    where: { email: user.email },
  });
  if (newUser.length > 0) {
    return {
      success: false,
      message: `The email "${user.email}" is already registered`,
    };
  } else {
    const id = crypto.randomBytes(10).toString('hex');
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    newUser = {
      id,
      ...user,
    };
    await User.create(newUser);
    return {
      newUser,
      success: true,
      message: `The email "${user.email}" successfully registered`,
    };
  }
};

const getUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

//get user by email
const getUser = async (user) => {
  const thisUser = await User.findAll({
    where: { email: user.email },
  });
  return thisUser;
};

//get user by id
const getUserById = async (id) => {
  const thisUser = await User.findByPk(id);
  return thisUser;
};

const updateUser = async (id, body) => {
  let updatedUser = await getUserById(id);
  if (updatedUser) {
    if (body.password) {
      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);
    }
    updatedUser = await User.update({ ...body }, { where: { id } });

    return { message: `User successfully updated` };
  }
  return updatedUser;
};

const deleteUser = async (id) => {
  let user = await getUserById(id);
  if (user) {
    await user.destroy({
      where: { id },
    });
  }
  return user;
};

export default {
  createUser,
  getUsers,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};

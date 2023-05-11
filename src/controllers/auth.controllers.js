import bcrypt from 'bcrypt';
import userService from '../services/users.services.js';

//Login
const userLogIn = async (req, res) => {
  const user = req.body;
  try {
    const thisUser = await userService.getUser(user);
    if (thisUser.length === 0) {
      return res.status(409).send({ message: 'The user does not exist' });
    } else {
      const matchedPassword = bcrypt.compareSync(
        user.password,
        thisUser[0].password
      );
      if (!matchedPassword) {
        return res.status(401).send({ message: 'Wrong password' });
      } else {
        //crea un usuario dentro de la sesion
        req.session.user = thisUser[0];
        req.session.save();
        return res.status(200).send(thisUser);
      }
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

//Verify if a session is started
const isLoggedIn = (req, res) => {
  if (req.session.user) {
    return res.send({ loggedIn: true, user: req.session.user });
  } else {
    return res.send({ loggedIn: false });
  }
};

//Logout
const userLogOut = (req, res) => {
  req.session.destroy();
  return res.status(200).send({ message: 'You are logged out' });
};

export { userLogIn, isLoggedIn, userLogOut };

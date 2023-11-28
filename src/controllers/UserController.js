import UserRepository from '../repositories/UserRepository.js';
import passport from 'passport';
import { createHash } from '../utils.js';

const userRepository = new UserRepository();

export const getUsers = async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.send({ status: 'success', result: users });
  } catch (error) {
    res.status(500).send({ status: 'error', error: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userRepository.getUserById(uid);
    res.send({ status: 'success', result: user });
  } catch (error) {
    res.status(500).send({ status: 'error', error: 'Error al obtener usuario por ID' });
  }
};



// Función para manejar el inicio de sesión
export const loginUser = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
      try {
          if (err || !user) {
              return res.status(401).send(info && info.message ? info.message : 'Error de autenticación');
          }
          req.login(user, (err) => {
              if (err) {
                  return next(err);
              }
              return res.redirect('/profile'); // Redirige al usuario a /profile después de iniciar sesión
          });
      } catch (error) {
          return next(error);
      }
  })(req, res, next);
};


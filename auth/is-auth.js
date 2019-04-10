import jwt from 'jsonwebtoken';
import User from '../models/user';

const isAuth = (req, res, next) => {
  // Check if Authorization header
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  // Get token from header
  const token = authHeader.split(' ')[1]; // Authorization: Bearer *token value*
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  // Verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  // Final check
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};

const getUser = decodeToken => {
  return User.findOne({ userId: decodedToken.userId })
    .populate('discipline')
    .populate('position')
    .then(result => {
      return result;
    })
    .catch(err => {
      throw err;
    });
};

export default getUser;

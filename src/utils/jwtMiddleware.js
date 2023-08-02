const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {

const token = req.header('Authorization').split(' ')[1]; 
  let secretKey = process.env.SECRET_KEY

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token,secretKey );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = jwtMiddleware;


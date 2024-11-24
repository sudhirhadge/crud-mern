//The current implementation of the auth middleware requires a token for all requests, 
//which prevents non-logged-in users from accessing the product data. To allow non-logged-in users to 
//view the product catalogue, we need to adjust the middleware and the route handling, check auth1

const jwt = require('jsonwebtoken');

function auth2(req, res, next) {
  const authHeader = req.header('Authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETNEW);
        req.user = decoded.userId;
      } catch (err) {
        return res.status(400).json({ message: 'Token is not valid' });
      }
    }
  }

  next();
}

module.exports = auth2;

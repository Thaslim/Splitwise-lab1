import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

//middleware
export default function (req, res, next) {
  // Get token from the header
  const token = req.header('my-auth-token');
  //   console.log('This was called');
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

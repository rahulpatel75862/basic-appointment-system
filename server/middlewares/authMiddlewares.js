import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Invalid token:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const teacherMiddleware = (req, res, next) => {
  if (req.user.role !== 'Teacher') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

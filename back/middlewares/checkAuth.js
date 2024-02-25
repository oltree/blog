import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decoded.id;

  next();
};

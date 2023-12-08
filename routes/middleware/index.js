import jwt from 'jsonwebtoken';


const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }
  
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      req.user = decoded; 
      next();
    });
  };
  
  export default authenticateUser
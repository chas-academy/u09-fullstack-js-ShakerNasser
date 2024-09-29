const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // Kontrollera decoded

    // Använd email istället för id för att hämta användaren
    req.user = await User.findOne({ email: decoded.email }).select('-password');
    console.log(req.user);  // Kontrollera vad som finns i req.user efter att du hämtat från databasen
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const admin = (req, res, next) => {
  console.log('req.user in admin:', req.user); // Logga för att se vad som finns i req.user här
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};


module.exports = { protect, admin };
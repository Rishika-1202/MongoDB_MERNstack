const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual JWT secret key

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'No token provided', success: false });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.userId = decoded.userId; // Attach userId to the request body
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token', success: false });
    }
};

module.exports = authMiddleware;

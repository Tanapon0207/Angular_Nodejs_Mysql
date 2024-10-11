const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // ควรเก็บไว้ใน .env

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // บันทึกข้อมูลผู้ใช้ที่ถูก decode ไว้ใน req
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

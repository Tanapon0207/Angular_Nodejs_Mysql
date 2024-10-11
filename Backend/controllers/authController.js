const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// สร้าง JWT Secret
const JWT_SECRET = 'your_jwt_secret_key'; // ควรเก็บไว้ใน .env

// Register (Create new user)
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // แฮชรหัสผ่านก่อนบันทึก
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword]
        );
        res.status(201).json({ id: result.insertId, firstName, lastName, email });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
}

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // ค้นหาผู้ใช้ตามอีเมล
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // สร้าง JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }  // token มีอายุ 1 ชั่วโมง
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
}

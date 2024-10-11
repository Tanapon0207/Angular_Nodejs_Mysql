const pool = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
}


// Create new product
exports.createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?)',
            [firstName, lastName, email, password]
        );
        res.status(201).json({ id: result.insertId, firstName, lastName, email, password});
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
}
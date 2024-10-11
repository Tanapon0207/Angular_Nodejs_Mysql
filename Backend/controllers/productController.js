const pool = require('../config/db');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
            [name, price, description]
        );
        res.status(201).json({ id: result.insertId, name, price, description });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
            [name, price, description, id]
        );
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
};

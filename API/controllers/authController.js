const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Handle default admin login
    if (email === 'admin@gmail.com' && password === 'admin') {
        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        return res.json({ token });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, isAdmin: user.isAdmin },
            JWT_SECRET
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, false],
                function (err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });

        const token = jwt.sign({ email, isAdmin: false }, JWT_SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    // Handle default admin login
    if (email === 'admin@deakin.edu.au' && password === 'admin123') {
        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        return res.json({ token });
    }

    try {
        const admin = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ? AND isAdmin = 1", [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!admin) {
            return res.status(401).json({ error: "Invalid admin credentials" });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid admin credentials" });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, isAdmin: true },
            JWT_SECRET
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminRegister = async (req, res) => {
    const { name, email, password, adminCode } = req.body;

    // Handle default admin registration
    if (adminCode === 'DEAKIN2024') {
        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        return res.json({ token });
    }

    try {
        const existingAdmin = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (existingAdmin) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, true],
                function (err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });

        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await new Promise((resolve, reject) => {
            db.get(
                "SELECT id, name, email, isAdmin FROM users WHERE id = ?",
                [userId],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
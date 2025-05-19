const db = require("../models/db");
const { v4: uuidv4 } = require('uuid');

exports.getInquiries = (req, res) => {
    db.all("SELECT * FROM inquiries ORDER BY createdAt DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ inquiries: rows, total: rows.length });
    });
};

exports.getInquiry = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM inquiries WHERE id = ?", [id], (err, inquiry) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });
        res.json(inquiry);
    });
};

exports.createInquiry = (req, res) => {
    const { firstName, lastName, email, phone, program, startDate, priority, message, userId } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    db.run(
        `INSERT INTO inquiries (id, firstName, lastName, email, phone, program, startDate, priority, message, status, createdAt, userId) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
        [id, firstName, lastName, email, phone, program, startDate, priority, message, now, userId],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            db.get("SELECT * FROM inquiries WHERE id = ?", [id], (err, inquiry) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(inquiry);
            });
        }
    );
};

exports.updateInquiry = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone, program, startDate, priority, message } = req.body;

    db.run(
        `UPDATE inquiries SET 
         firstName = COALESCE(?, firstName),
         lastName = COALESCE(?, lastName),
         phone = COALESCE(?, phone),
         program = COALESCE(?, program),
         startDate = COALESCE(?, startDate),
         priority = COALESCE(?, priority),
         message = COALESCE(?, message)
         WHERE id = ?`,
        [firstName, lastName, phone, program, startDate, priority, message, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Inquiry not found" });
            db.get("SELECT * FROM inquiries WHERE id = ?", [id], (err, inquiry) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(inquiry);
            });
        }
    );
};

exports.deleteInquiry = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM inquiries WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Inquiry not found" });
        res.status(204).send();
    });
};

exports.completeInquiry = (req, res) => {
    const { id } = req.params;
    const completedAt = new Date().toISOString();
    const completedBy = req.user.id; // Assuming user info is attached to req by auth middleware

    db.run(
        "UPDATE inquiries SET status = 'completed', completedAt = ?, completedBy = ? WHERE id = ?",
        [completedAt, completedBy, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Inquiry not found" });
            db.get("SELECT * FROM inquiries WHERE id = ?", [id], (err, inquiry) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(inquiry);
            });
        }
    );
};
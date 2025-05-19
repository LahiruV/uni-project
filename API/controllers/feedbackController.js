const db = require("../models/db");
const { v4: uuidv4 } = require('uuid');

exports.getFeedbacks = (req, res) => {
    db.all("SELECT * FROM feedback ORDER BY createdAt DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ feedbacks: rows, total: rows.length });
    });
};

exports.createFeedback = (req, res) => {
    const { name, email, message, type } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    db.run(
        "INSERT INTO feedback (id, name, email, message, type, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, name, email, message, type, now, now],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            db.get("SELECT * FROM feedback WHERE id = ?", [id], (err, feedback) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(feedback);
            });
        }
    );
};

exports.updateFeedback = (req, res) => {
    const { id } = req.params;
    const { name, email, message, type } = req.body;
    const now = new Date().toISOString();

    db.run(
        "UPDATE feedback SET name = ?, email = ?, message = ?, type = ?, updatedAt = ? WHERE id = ?",
        [name, email, message, type, now, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Feedback not found" });
            db.get("SELECT * FROM feedback WHERE id = ?", [id], (err, feedback) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(feedback);
            });
        }
    );
};

exports.deleteFeedback = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM feedback WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Feedback not found" });
        res.status(204).send();
    });
};
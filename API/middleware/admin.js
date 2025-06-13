module.exports = function (req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: "Admin access required" });
    }
};
import db from '../config/db.js';

export const getUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.json(data);
    });
};


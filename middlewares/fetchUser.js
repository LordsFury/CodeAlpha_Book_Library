const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.User; 
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchUser;

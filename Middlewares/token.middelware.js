const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const getUsersFromDatabase = async () => {
    try {
        const users = await userModel.find();
        return users;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const isAdmin = async (req, res, next) => {
    const token = req.header('auth-token');
    const user = jwt.verify(token, 'config.TOKEN_SECRET');
    // req.user = user;
    // console.log(user);
    try {
        if (user.name === "ayala" && bcrypt.compare("123456", user.password)) {
            next();
        }
        else{
             return res.status(500).send('No access to a non-admin user');
        }
    } catch (err) {
        console.error("Error fetching users from database:", err);
        return res.status(500).send('No access to a non-admin user');
    }
}


const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('There is no token.');
    }

    const verified = jwt.verify(token, 'config.TOKEN_SECRET');
    req.user = verified;
    console.log(verified);

    try {
        const users = await getUsersFromDatabase();
        // console.log(users);
        // בדיקה אם המשתמש נמצא במסד הנתונים
        const userExists = users.some(e => e._id == verified._id);
        if (userExists) {
            next();
        } else {
            return res.status(400).send('User token does not exist.');
        }
    } catch (err) {
        console.error("Error fetching users from database:", err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    verifyToken,
    isAdmin
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
let id = 1000;

const getUsersFromDatabase = async () => {
    try {
        const users = await userModel.find();
        return users;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const login = async (req, res) => {
    const userName = req.body.name;
    const password = req.body.password;
    try {
        const users = await getUsersFromDatabase();
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(users);
        for (const user of users) {
            if (user.name === userName && bcrypt.compare(hashedPassword, user.password)) {
                const token = jwt.sign({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                }, 'config.TOKEN_SECRET');
                return res.header('auth-token', token).send({ 'token': token });
            }
        }
        res.status(400).send('User does not exist.');
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
};


const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            _id: id++,
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }, 'config.TOKEN_SECRET'); // שנה ל-secret שלך
        res.header('auth-token', token).send({ token, name: newUser.name });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};
// לא ברור למה רק ככה זה עובד בשביל הבדיקות
// const logout = (req, res, error) => {
//     if (error) {
//         res.status(500).send('Logout failed');
//     }
//     else {
//         res.setHeader('auth-token', null);
//         res.status(200).send('Logout successful');
//     }
// };
const logout = (req, res) => {
    res.setHeader('auth-token', null);
    res.status(200).send('Logout successful');
};

module.exports = {
    login,
    register,
    logout,
};


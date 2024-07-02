const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
let id = 64646452;

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
        for (const user of users) {
            if (user.name === userName && bcrypt.compare(hashedPassword, user.password)) {
                const token = jwt.sign({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    isAdmin: user.isAdmin,
                }, 'config.TOKEN_SECRET');
                const isAdmin = user.isAdmin
                const response = {
                    token,
                    userId: user._id,
                    isAdmin,
                  };
                return res.header('auth-token', token).send( response);
            }
        }
        res.status(400).send('User does not exist.');
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
};


const register = async (req, res) => {
    // console.log(req.body);

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
            isAdmin: false,
        });
        console.log(newUser, "newUser");
        await newUser.save();
        const token = jwt.sign({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: false,
        }, 'config.TOKEN_SECRET'); 
        res.header('auth-token', token).send({ token, name: newUser.name });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
};

const logout = (req, res) => {
    res.setHeader('auth-token', null);
    res.status(200).send('Logout successful');
};

module.exports = {
    login,
    register,
    logout,
};


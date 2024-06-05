// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const express = require('express');
// const router = express.Router();
// const userModel = require('../Models/user.model');


// const getUsersFromDatabase = () => {
//     router.get('User', async (req, res) => {
//         try {
//           const users = await userModel.find();
//           console.log("sdfghjk");
//           console.log(users+"dfghj");
//           console.log(userModel);
//           return users;
//         } catch (err) {
//           console.error(err);
//           res.status(500).send('Error retrieving userings');
//         }
//       })
// };

// const login = ('', (req, res) => {
//     const userName = req.body.name;
//     const password = req.body.password;

//     //   getUsersFromDatabase().then(users => { // קריאה לפונקציה getUsersFromDatabase כאן

//     getUsersFromDatabase().forEach((user) => {
//         if (user.name === userName && bcrypt.compare(password, user.password)) {
//             const token = jwt.sign({
//                 _id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 password: user.password,
//             },
//                 'config.TOKEN_SECRET');
//             res.header('auth-token', token).send({ 'token': token });
//         } else {
//             res.status(400).send('User does not exist.');
//         }
//     });
// })
// // .catch(error => {
// //     console.error('Error retrieving users:', error);
// //     res.status(500).send('Internal Server Error');
// // });
// // });

// const logout = (req, res) => {
//     res.setHeader('auth-token', null);
//     res.status(200).send('Logout successful');
// };

// module.exports = {
//     login,
//     logout,
// };
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const userModel = require('../Models/user.model');

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
        // console.log(users);
        console.log(users);
        for (const user of users) {
            if (user.name === userName && bcrypt.compare(password, user.password)) {
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

const logout = (req, res) => {
    res.setHeader('auth-token', null);
    res.status(200).send('Logout successful');
};

module.exports = {
    login,
    logout,
};


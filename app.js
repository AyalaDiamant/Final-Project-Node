const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const db = require('./DBconnect');

const meetings = require('./Routers/meet.router')
const services = require('./Routers/service.router')
const users = require('./Routers/user.router')
const login = require('./Routers/login.router')
const { verifyToken } = require('./Middlewares/token.middelware');


app.use(login);
app.use(verifyToken);

app.use(meetings);
app.use(services);
app.use(users);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error in the router, please try later⌛');
});

app.get('*', (req, res) => {
    res.status(404).send('PAGE NOT FOUND😤');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
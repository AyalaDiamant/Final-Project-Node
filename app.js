const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const db = require('./DBconnect');

const meetings = require('./Routers/meet.router')
const services = require('./Routers/service.router')
const users = require('./Routers/user.router')

app.use(meetings);
app.use(services);
app.use(users);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
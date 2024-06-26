const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./DBconnect');
const port = process.env.PORT;

require('dotenv').config();

const meetings = require('./routers/meet.router')
const services = require('./routers/service.router')
const users = require('./routers/user.router')
const login = require('./routers/login.router')
const { verifyToken } = require('./middlewares/token.middelware');

const swaggerSetup = require('./swagger');

// Middleware
app.use(cors());
app.use(express.json());

// התקנת Swagger
swaggerSetup(app);

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

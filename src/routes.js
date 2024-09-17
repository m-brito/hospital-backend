const express = require('express');

const routes = express.Router();

routes.post('/login', (req, res) => {
    //res.send('Login endpoint');
    const{email, password} = req.body;
    res.send(email)
});

module.exports = routes;
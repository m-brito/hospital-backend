//apenas teste

const express = require('express');

const routes = require('./routes');

const app = express()

app.use(express.json());

app.get('/', (req,res) => {
res.send('Hello World!');
})

app.listen(3000, () => {
    console.log("conectando porta padrão 3000")   
});
const express = require('express');
const routes = require('./routes');
const sequelize = require('../sequelize');

const app = express();
app.use(express.json());

sequelize.sync({ force: true }).then(() => {
    console.log('Database synchronized!');
}).catch((error) => {
    console.error('Error synchronizing database:', error);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


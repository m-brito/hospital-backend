const express = require('express');
const sequelize = require('../sequelize');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

// { force: true }
sequelize.sync().then(() => {
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


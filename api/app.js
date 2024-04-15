const express = require( "express");
const dotenv = require( "dotenv");
dotenv.config();
const app = express();
const db = require('./models/index');
const {PORT} = require("./config/");
const authRoute = require("./routes/authRoute");
const rateRoute = require("./routes/rateRoute");

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/get', rateRoute);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
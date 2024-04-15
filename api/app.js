const express = require( "express");
const dotenv = require( "dotenv");
dotenv.config();
const app = express();
const {PORT} = require("./config/");
const authRoute = require("./routes/authRoute");
const rateRoute = require("./routes/rateRoute");

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/get', rateRoute);
app.listen(PORT || 8080, () => console.log(`Example app listening on PORT http://localhost:${PORT} !`))
const express = require( "express");
const dotenv = require( "dotenv");
dotenv.config();
const app = express();
const cors = require('cors');
const db = require('./models/index');
const {PORT, CLIENT_ORIGIN} = require("./config/");
const authRoute = require("./routes/authRoute");
const rateRoute = require("./routes/rateRoute");

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT"]
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/rate', rateRoute);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
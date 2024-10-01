const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const MongoStore = require("connect-mongo");
const methodOverride = require('method-override')

require('dotenv/config')

// ! -- Variables
const app = express()
const port = 3000
const swordsController = require("./controllers/swords.js");
const authController = require("./controllers/auth.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

const session = require('express-session');

// ! -- Middleware
app.use(express.urlencoded({ extendedurl: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

//adds the user session to all views
app.use(passUserToView);

//Contorllers
app.use("/swords", swordsController);
app.use("/auth", authController);



// Start the Express server
const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection established");

        app.listen(port, () => {
            console.log(`🚀 Express api lab on ${port}`)
        })

    } catch (error) {
        console.log(error);
    }
}
startServers();
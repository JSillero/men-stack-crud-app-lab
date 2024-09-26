const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')

// ! -- Variables
const app = express()
const port = 3000

//model
const Swords = require('./models/swords');

// ! -- Middleware
app.use(express.urlencoded({extendedurl: false}));
app.use(morgan('dev'));

// ! -- Index
app.get("/swords", async (req, res) => {
    try {
        const swords = await Swords.find();
        return res.status(201).render("index.ejs", {
            swords: swords,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})

// ! -- CRUD
/* Create */
//
app.get("/swords/new", async (req, res) => {
    try {
         return res.status(201).render("swordForm.ejs");
    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})

app.put("/swords", async (req, res) => {
    try {
        console.dir(req.body)
        const sword = await Swords.create(req.body);
        return res.status(201).redirect("/swords/new");
    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})

// ! -- Index
app.get("/swords/:swordID", async (req, res) => {
    try {
        const foundDocument = await Swords.findOne().select({ id: req.params.contactId });

        if (!foundDocument) return res.status(404).send('Contact not found')

        return res.send(foundDocument)

    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})








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
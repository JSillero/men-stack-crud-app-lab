const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv/config')

// ! -- Variables
const app = express()
const port = 3000

//model
const Swords = require('./models/swords');

// ! -- Middleware
app.use(express.urlencoded({ extendedurl: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'))

// ! -- Index
app.get("/swords", async (req, res) => {
    try {
        const swords = await Swords.find();
        return res.status(200).render("index.ejs", {
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
        return res.render("swordForm.ejs");
    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})

app.post("/swords", async (req, res) => {
    try {
        console.dir(req.body)
        req.body.doubleEdged = !!req.body.doubleEdged;
        const sword = await Swords.create(req.body);
        return res.status(201).redirect("/swords");
    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})
//!--- UPDATE
app.get("/swords/:swordID/edit", async (req, res) => {
    try {
        const foundDocument = await Swords.findById(req.params.swordID);

        if (!foundDocument) return res.status(404).send('Sword not found')

        return res.render("swordEditForm.ejs", {
            swords: foundDocument
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})


app.put("/swords/:swordID", async (req, res) => {
    try {
        req.body.doubleEdged = !!req.body.doubleEdged;
        const foundDocument = await Swords.findByIdAndUpdate(req.params.swordID, req.body);
        console.log("sword updateD");
        if (!foundDocument) return res.status(404).send('Sword not found')

        return res.redirect("/swords");

    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})

// !-- DELETE
app.delete("/swords/:swordID", async (req, res) => {
    try {
        const foundDocument = await Swords.findByIdAndDelete(req.params.swordID);

        if (!foundDocument) return res.status(404).send('Sword not found')

        return res.redirect("/swords");

    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})



// ! --- READ
// ! -- Index
app.get("/swords", async (req, res) => {
    try {
        const foundDocument = await Swords.find();
        console.dir(foundDocument);
        if (!foundDocument) return res.status(404).send('Sword not found')

        return res.render("index.ejs", {
            swords: foundDocument
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})
// ! -- single view
app.get("/swords/:swordID", async (req, res) => {
    try {
        const foundDocument = await Swords.findById(req.params.swordID);

        if (!foundDocument) return res.status(404).send('Sword not found')
        console.log("Found doc:")
        console.dir(foundDocument);
        return res.render("singleview.ejs", {
            swords: foundDocument
        })

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
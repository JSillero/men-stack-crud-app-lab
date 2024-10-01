const express = require("express");
const router = express.Router();

//model
const Swords = require('../models/swords');

// ! -- Index
router.get("/", async (req, res) => {
    let swords;
    try {
        swords = await Swords.find();
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
router.get("/new", async (req, res) => {
    try {
        return res.render("swordForm.ejs");
    } catch (error) {
        console.log(error);
        return res.status(500).send('An error occurred')
    }
})

router.post("/", async (req, res) => {
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
router.get("/:swordID/edit", async (req, res) => {
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


router.put("/:swordID", async (req, res) => {
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
router.delete("/:swordID", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:swordID", async (req, res) => {
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


module.exports = router;

const express = require('express')
const router = express.Router()
const Exercises = require('../models/exercises.json')

// route for retrieving exercises
router.get("/", (req, res) => {
    // send exercises via JSON
    res.json(Exercises)
});



module.exports = router
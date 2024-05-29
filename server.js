///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config()

const { MONGODB_URI, PORT = 4000 } = process.env

const express = require('express')

const app = express()

const mongoose = require('mongoose')

const cors = require('cors')

const morgan = require('morgan')

const methodOverride = require('method-override')

///////////////////////////////
// DB CONNECTION
////////////////////////////////

mongoose.connect(MONGODB_URI  ,  { useNewUrlParser: true});

// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error))


///////////////////////////////
// Middlewear
////////////////////////////////
app.use( cors() )

app.use( morgan('dev') )

app.use( express.json() )

app.use(methodOverride('_method'))

///////////////////////////////
// CONTROLLERS
///////////////////////////////

const usersController = require('./controllers/users.js')
app.use('/users', usersController)
// app.use(isAuthenticated)

const exercisesController = require('./controllers/exercises.js')
app.use('/exercises', exercisesController)

const workoutsController = require('./controllers/workouts.js')
app.use('/workouts', workoutsController)

///////////////////////////////
// Routes
////////////////////////////////

app.get('/', (req, res) => {
    res.send( '<h1>ThriveWorkout</h1>' )
})


///////////////////////////////
// Listener
////////////////////////////////
app.listen(PORT)
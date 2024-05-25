const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')

// Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find({})
        res.json(workouts)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Add a new workout
router.post('/', async (req, res) => {
    try {
        const workout = new Workout({
            name: req.body.name,
            exercises: req.body.exercises,
            icon: req.body.icon
        })
        const savedWorkout = await workout.save()
        res.json(savedWorkout) 
    } catch (error) {
        res.status(400).json(error)
    }
})


// Update a workout by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'no workout found with this ID' })
        }
        res.json(updatedWorkout)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Delete a workout by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id)
        if (!deletedWorkout) {
            return res.status(404).json({ error: "Workout not found" })
        }
        res.json(deletedWorkout)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router

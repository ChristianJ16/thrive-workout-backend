const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')
const authenticateToken = require('../authMiddleware')

// Get all workouts
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id
    try {
        const workouts = await Workout.find({ createdBy: userId })
        res.json(workouts)
    } catch (error) {
        res.status(400).json({ message: 'Error fetching workouts', error })
    }
})

// Add a new workout
router.post('/', authenticateToken, async (req, res) => {
    console.log('Creating new workout with user ID:', req.user.id)
    const { name, exercises, icon } = req.body
    try {
        const workout = new Workout({
            name,
            exercises,
            icon,
            createdBy: req.user.id
        })
        const savedWorkout = await workout.save()
        console.log('Workout saved:', savedWorkout)
        res.json(savedWorkout) 
    } catch (error) {
        res.status(400).json({ message: 'Error saving workout', error })
    }
})


// Update a workout by ID
// router.put('/:id', authenticateToken, async (req, res) => {
//     try {
//         const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         if (!updatedWorkout) {
//             return res.status(404).json({ message: 'no workout found with this ID' })
//         }
//         res.json(updatedWorkout)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const workout = await Workout.findOne({ _id: req.params.id, createdBy: req.user.id })
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found or user not authorized' })
        }
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedWorkout)
    } catch (error) {
        res.status(400).json({ message: 'Error updating workout', error })
    }
})

// Delete a workout by ID
// router.delete('/:id', authenticateToken, async (req, res) => {
//     try {
//         const deletedWorkout = await Workout.findByIdAndDelete(req.params.id)
//         if (!deletedWorkout) {
//             return res.status(404).json({ error: "Workout not found" })
//         }
//         res.json(deletedWorkout)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id })
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found or user not authorized' })
        }
        res.json({ message: 'Workout deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: 'Error deleting workout', error })
    }
})

module.exports = router

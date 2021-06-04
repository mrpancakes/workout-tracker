const router = require('express').Router();
const Workout = require('../models/Workout');


// Create a new workout
router.post('/api/workouts', (req, res) => {
    Workout.create
})


// Update existing workout
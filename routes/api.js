const router = require('express').Router();
const Workout = require('../models/Workout.js');


// Create a new workout
router.post('/api/workouts', (req, res) => {
    console.log(req.body);
    Workout.create({})
    .then(workoutDB => {
        console.log(workoutDB);
        res.json(workoutDB);
        
    })
    .catch(err => {
        console.log(err)
        res.json(err);
    });
});

// Update existing workout
router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        { new: true, runValidators: true }
    )
    .then(workoutDB => {
        res.json(workoutDB)
        console.log(req.body);
    })
    .catch(err => {
        res.json(err);
    });
});

// get all workouts, add exercise duration
router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .sort({ _id: -1 })
    .limit(7)
    .then(workoutDB => {
        console.log(workoutDB);
        res.json(workoutDB);
    })
    .catch(err => {
        res.json(err);
    });
});

router.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;
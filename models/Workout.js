const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: 'Exercise type cannot be empty',
            },
            name: {
                type: String,
                trim: true,
                required: 'Exercise name cannot be empty',
            },
            duration: {
                type: Number,
                required: 'Enter an exercise duration in minutes',
            },
            weight: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            distance: {
                type: Number,
            },
        },
    ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
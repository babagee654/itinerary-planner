const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    groupSize: Number,
    groupType: String,
    vacationType: String,
    vacationStyle: String,
    budget: Number,
    budgetType: String,
    preferredAccommodations: [String],
    dietaryRestrictions: [String],
    cuisinePreferences: [String],
    healthConsiderations: Boolean,
    mobilityConsiderations: Boolean,
    pointsOfInterest: [String],
    transportationType: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
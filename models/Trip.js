const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: String,
    country: String,
    startDate: Date,
    endDate: Date,
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
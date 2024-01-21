const mongoose = require('mongoose');

const countryTipSchema = new mongoose.Schema({
    countrySpecificTips: [String],
    safetyTips: [String],
    budgetingTips: [String],
    transportationTips: [String],
    accomodationTips: [String],
    cuisineTips: [String],
    dietaryTips: [String],
    culturalTips: [String],
    preparationTips: [String],
    technologyTips: [String],
    healthTips: [String],
    languageTips: [String],
    emergencyTips: [String],
    country: { type: String, required: true },

});

const CountryTip = mongoose.model('CountryTip', countryTipSchema);

module.exports = CountryTip;
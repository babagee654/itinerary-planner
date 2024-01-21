// viewsController.js
const Trip = require('../models/Trip');
const PackingList = require('../models/PackingList');
const CountryTip = require('../models/CountryTip');

const dummyCountryTips = {
    Canada: {
        "countrySpecificTips": [
            "Check the weather forecast in advance as Canadian weather can be quite variable.",
            "Always carry a valid ID with you."
        ],
        "safetyTips": [
            "In case of wildlife encounters, keep a safe distance, especially in national parks.",
            "Stay aware of your surroundings in unfamiliar areas."
        ],
        "budgetingTips": [
            "Consider buying a city tourism card for discounts on attractions.",
            "Use public transportation for a more budget-friendly travel experience."
        ],
        "transportationTips": [
            "Canada has an extensive rail network - consider a rail pass for cross-country travel.",
            "In urban areas, public transit is reliable and convenient."
        ],
        "accomodationTips": [
            "Book accommodations well in advance if you're visiting during peak tourist seasons.",
            "Consider staying in bed-and-breakfasts for a more local experience."
        ],
        "cuisineTips": [
            "Try local delicacies like poutine, butter tarts, and Canadian bacon.",
            "Visit local markets for fresh, regional produce."
        ],
        "dietaryTips": [
            "Most restaurants cater to a range of dietary needs, including vegetarian and gluten-free options."
        ],
        "culturalTips": [
            "Canadians are known for being polite and punctual. It's appreciated if you are on time for appointments."
        ],
        "preparationTips": [
            "Pack both light and warm clothing as temperatures can vary, especially if you're traveling across different regions."
        ],
        "technologyTips": [
            "Free Wi-Fi is widely available in public spaces and hotels.",
            "Consider buying a Canadian SIM card for better rates on local calls and data."
        ],
        "healthTips": [
            "Travel health insurance is recommended as healthcare for non-residents can be expensive."
        ],
        "languageTips": [
            "English and French are the official languages. Basic knowledge of French can be useful in Quebec."
        ],
        "emergencyTips": [
            "The emergency number in Canada is 911 for police, fire, and medical emergencies."
        ],
        "country": "Canada"
    }
}

const dummyPackingList = {
    Canada: {
        essential: [
            "Weather-appropriate clothing (e.g., thermal wear, waterproof jacket, or light clothing depending on the season)",
            "Comfortable walking shoes",
            "Passport and travel documents",
            "Credit/debit cards and some Canadian currency",
            "Personal hygiene items (toothbrush, toothpaste, deodorant, etc.)",
            "Prescription medications with a copy of the prescription",
            "Mobile phone and charger",
            "Sunglasses and sunscreen (for summer or high-altitude areas)",
            "Reusable water bottle",
            "Backpack or day bag for daily excursions"
        ],
        optional: [
            "Camera or additional photography equipment",
            "Travel guidebook or maps",
            "Swimwear (if planning to visit beaches or pools)",
            "Binoculars (for wildlife watching or scenic views)",
            "Travel adapter for electronics (if coming from outside North America)",
            "Snacks or specific dietary items",
            "Notebook and pen",
            "Travel pillow and eye mask for comfortable travel"
        ]
    }
}

// View home page
exports.getHome = (req, res) => {
    if (req.session.user) {
        res.render('index', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
};

// view specific trip
exports.getTrip = async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    const packingList = await PackingList.findOne({ trip: trip._id });
    const countryTip = await CountryTip.find({ country: trip.country }); // [] of country tips
    res.render('trip', { trip, packingList, countryTip });
}

// forms for adding new trip
exports.startForms = async (req, res) => {
    req.session.formData = { ...req.body };
    console.log("req.session.formData1: ", req.session.formData)
    res.redirect(`/form1`);
}
exports.getForm1 = (req, res) => {
    res.render('forms/form1');
}
exports.postForm1 = async (req, res) => {
    req.session.formData = { ...req.session.formData, ...req.body };
    console.log("req.session.formData2: ", req.session.formData)
    res.redirect(`/form2`);
}
exports.getForm2 = (req, res) => {
    res.render('forms/form2');
}
exports.postForm2 = async (req, res) => {
    req.session.formData = { ...req.session.formData, ...req.body };
    console.log("req.session.formData3: ", req.session.formData)
    res.redirect(`/form3`);
}
exports.getForm3 = (req, res) => {
    res.render('forms/form3');
}
exports.postForm3 = async (req, res) => {
    req.session.formData = { ...req.session.formData, ...req.body };
    console.log("req.session.formData4: ", req.session.formData)

    const trip = new Trip(req.session.formData);
    let packingList, countryTip
    if (trip.country === "Canada") {
        packingList = new PackingList(dummyPackingList.Canada);
        countryTip = new CountryTip(dummyCountryTips.Canada);
    } else {
        packingList = new PackingList();
        countryTip = new CountryTip();
    }
    trip.name = `Tips for ${trip.country}!!`
    trip.user = req.session.user._id;
    packingList.trip = trip._id;
    countryTip.country = trip.country;
    await trip.save();
    await packingList.save();
    await countryTip.save();
    const id = trip._id;
    res.redirect(`/trip/${id}`);
}


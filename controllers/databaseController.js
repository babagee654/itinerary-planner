// databaseController.js
const User = require('../models/User');
const Trip = require('../models/Trip');
const PackingList = require('../models/PackingList');
const CountryTip = require('../models/CountryTip');


// Get single user by username
exports.getUser = (req, res) => {
    const password = req.body.password;
    User.findOne({ username: req.params.username })
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).send({
                    message: "User not found with username " + req.params.username
                });
            }
            if (result[0].password !== password) {
                return res.status(401).send({
                    message: "Incorrect password"
                });
            }
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the User."
            });
        });
}
// Add user
exports.addUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    });
    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
}
// Get single trip
exports.getTrip = (req, res) => {
    Trip.findById(req.params.id)
        .then((result) => {
            if (!result) {
                return res.status(404).send({
                    message: "Trip not found with id " + req.params.id
                });
            }
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Trip."
            });
        });
}
// Get all trips
exports.getTrips = (req, res) => {
    const user = req.session.user
    Trip.find({ user: user._id })
        .then((result) => {
            res.send(result); // [Trip]
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Trip."
            });
        });
}
// Add trip
exports.addTrip = async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ username: username })
    const trip = new Trip(req.body)
    trip.user = user._id
    trip.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the PackingList."
            });
        });
}

// Get single packing list
exports.getPackingList = (req, res) => {
    const tripId = req.params.id
    PackingList.findOne({ trip: tripId })
        .then((result) => {
            if (!result) {
                return res.status(404).send({
                    message: "PackingList not found with id " + req.params.id
                });
            }
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the PackingList."
            });
        });
}
// Add packing list
exports.addPackingList = (req, res) => {
    const packingList = new PackingList(req.body);
    packingList.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the PackingList."
            });
        });
};
// Add country tip
exports.addCountryTip = (req, res) => {
    const countryTip = new CountryTip(req.body);
    countryTip.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the CountryTip."
            });
        });
};
// Update country tip

// Delete country tip
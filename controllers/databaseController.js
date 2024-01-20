// databaseController.js

const User = require('../models/User');

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
};

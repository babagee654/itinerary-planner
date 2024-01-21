const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const User = require('../models/User');
const Trip = require('../models/Trip');
const PackingList = require('../models/PackingList');
const CountryTip = require('../models/CountryTip');




// view specific trip
router.get('/trip/:id', viewsController.getTrip);

// login page
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Here, you would normally validate the username and password
    await User.findOne({ username: username })
        .then((result) => {
            if (result.length === 0) {
                console.log("User not found")
                res.status(404).send({
                    message: "User not found with username " + username
                });
            }
            if (result.password !== password) {
                console.log("Incorrect password")
                res.status(401).send({
                    message: "Incorrect password"
                });
            }
            console.log("Found user: ", result);
            req.session.user = result;
            console.log("Setting req.session.user: ", req.session.user)
            res.redirect('/');
        })
        .catch((err) => {
            console.log("Error: ", err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the User."
            });
        });

});
// logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Could not log out, please try again');
        } else {
            res.send('Logged out successfully');
        }
    });
});
module.exports = router;

// Home page
router.get('/', viewsController.getHome);
router.post('/startForms', viewsController.startForms);
router.get('/form1', viewsController.getForm1);
router.post('/form1', viewsController.postForm1);
router.get('/form2', viewsController.getForm2);
router.post('/form2', viewsController.postForm2);
router.get('/form3', viewsController.getForm3);
router.post('/form3', viewsController.postForm3);

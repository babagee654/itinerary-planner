const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');

// /api/addUser
router.post('/addUser', databaseController.addUser);

module.exports = router;
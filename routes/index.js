/*
	Chirp!
	
	Author: Rosario Alessandro Cali
	Date: November 1, 2017
	Version: 1.0
*/

// Defining Imports
var express = require('express');
var router = express.Router();

// Redirects to Index Page
router.get('/', function(req, res, next) {
    res.render('index', { title: "Chirp" });
});

module.exports = router;
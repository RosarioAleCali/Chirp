/*
	Chirp!
	
	Author: Rosario Alessandro Cali
	Date: November 1, 2017
	Version: 1.0
*/

// Defining Imports
var express = require('express');
var router = express.Router();

// Defining routes using express.js to send states to AngularJS
module.exports = function(passport) {
	// Sends successful login state back to angular
	router.get('/success', function(req, res) {
		res.send({ state: 'success', user: req.user ? req.user : null });
	});

	// Sends failure login state back to angular
	router.get('/failure', function(req, res) {
		res.send({ state: 'failure', user: null, message: "Invalid username or password!" });
	});

	// Log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	// Sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	// Log out
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};
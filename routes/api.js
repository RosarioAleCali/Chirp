/*
	Chirp!
	
	Author: Rosario Alessandro Cali
	Date: November 1, 2017
	Version: 1.0
*/

// Defining Imports
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

// Used for routes that must be authenticated.
isAuthenticated = function (req, res, next) {
	// If user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// Request and response objects

	// Allow all get request methods
	if(req.method === "GET") {
		return next();
	}
	if (req.isAuthenticated()) {
		return next();
	}

	// Redirect to login page if the User is not authenticated.
	res.redirect('/#login');
};

router.use('/posts', isAuthenticated);

router.route('/posts')
	.post(function(req, res) { // Creates a new post
		if(!req.isAuthenticated()) {
			return res.send(401, { message:'User Not Authorized' });
		}
		var post = new Post();
		post.text = req.body.text;
		post.created_by = req.body.created_by;
		post.save(function(err, post) {
			if (err) {
				console.log("Error is: " + err);
				return res.status(500).send(err);
			}
			return res.json(post);
		});
	})
	.get(function(req, res) { // Gets all posts
		Post.find(function(err, posts) {
			if(err) {
				return res.status(500).send(err);
			}
			return res.send(posts);
		});
	});

// Post-specific commands.
router.route('/posts/:id')
	.get(function(req, res) { // Gets specified post
		Post.findById(req.params.id, function(err, post) {
			if(err) {
				res.send(err);
			}
			res.json(post);
		});
	})
	.put(function(req, res) { // Updates specified post
		Post.findById(req.params.id, function(err, post) {
			if(err)
				res.send(err);

			post.created_by = req.body.created_by;
			post.text = req.body.text;

			post.save(function(err, post){
				if(err)
					res.send(err);

				res.json(post);
			});
		});
	})
	.delete(function(req, res) { // Deletes the post
		Post.remove({
			_id: req.params.id
		}, function(err) {
			if (err) {
				res.send(err);
			}
			res.json("Post Deleted");
		});
	});

module.exports = router;
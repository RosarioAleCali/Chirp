/*
	Chirp!
	
	Author: Rosario Alessandro Cali
	Date: November 1, 2017
	Version: 1.0
*/

// Defining Imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	Defining Schemas for Posts and Users.
	Each Schema maps to a MongoDB collection
	and defines the shape of the documents 
	within that collection.
*/
var postSchema = new Schema({
	created_by: String,
	created_at: { type: Date, default: Date.now },
	text: String
});

var userSchema = new Schema({
	username: String,
	password: String,
	created_at: { type: Date, default: Date.now }
})


// Defining Models to work with based on the Schemas
mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);

// Utility Functions
var User = mongoose.model('User');

exports.findByUsername = function(userName, callback) {
	User.findOne({ user_name: userName }, function(err, user) {
		if(err) {
			return callback(err);
		}

		return callback(null, user);
	});
}

exports.findById = function(id, callback) {
	User.findById(id, function(err, user) {
		if(err) {
			return callback(err);
		}

		return callback(null, user);
	});
}
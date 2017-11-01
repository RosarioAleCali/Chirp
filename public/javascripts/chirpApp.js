/*
	Chirp!
	
	Author: Rosario Alessandro Cali
	Date: November 1, 2017
	Version: 1.0
*/

/*
	Defining an angular.module as a global place for creating,
	registering and retrieving AngularJS modules.
	All modules available to the application are registered here.
*/
var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function() {
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user  = 'Guest';
	};
});

// Defining what to do on module loading.
app.config(function($routeProvider){
	$routeProvider
		.when('/', { // Timeline display
			templateUrl: 'main.html',
			controller:  'mainController'
		})
		.when('/login', { // Login display
			templateUrl: 'login.html',
			controller:  'authController'
		})
		.when('/register', { // Signup display
			templateUrl: 'register.html',
			controller:  'authController'
		});
});

/*
	Registering a service factory, which will be called
	to return the service instance.
*/
app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

// Defining new controllers
app.controller('mainController', function($scope, $rootScope, postService) {
	$scope.posts = postService.query();
	$scope.newPost = { created_by: '', text: '', created_at: '' };

	$scope.post = function() {
		$scope.newPost.created_by = $rootScope.current_user;
		$scope.newPost.created_at = Date.now();
		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = { created_by: '', text: '', created_at: '' };
		});
	};
	$scope.delete = function(post)	{
		postService.delete({ id: post._id });
		$scope.posts = postService.query();
	};
});

app.controller('authController', function($scope, $http, $rootScope, $location) {
	$scope.user = { username: '', password: '' };
	$scope.error_message = '';

	$scope.login = function() {
		$http.post('/auth/login', $scope.user).success(function(data) {
			if(data.state == 'success') {
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};

	$scope.register = function() {
		$http.post('/auth/signup', $scope.user).success(function(data) {
			if(data.state == 'success') {
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
});
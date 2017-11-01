# Chirp
A simple Twitter clone built using the MEAN stack.

## Introduction
This is the result from a tutorial that I have followed with the goal to learn about the MEAN stack.<br/>
The tutorial can be found here:<br/>
[![MEAN_STACK_YOUTUBE_TUT](http://img.youtube.com/vi/Lzi2xYQdwWc/0.jpg)](http://www.youtube.com/watch?v=Lzi2xYQdwWc)<br/>
As of right now, my result is very close to the one from the tutorial.<br/>
I have only applied a few different visual changes but I may add more features in the following months.<br/><br/>
This project uses the whole MEAN stack (MongoDB, Express, AngularJS, and NodeJS) to build a simplified Twitter clone named Chirp.<br/>
Chirp is a Single-Page Application that uses the AngularJS Framework to create its dynamic front-end, NodeJS to create a
server-side application with authentication services, MongoDB to store the data, and Express to build a RESTful API.<br/>
## Setting up the front-end with AngularJS
The first thing to be done is to create an Angular app that is going to control all the functionalities of Chirp.<br/>
The file will be named _chirpApp.js_ and it will contain the _chirpApp Module_ that contains all the logic for the Angular app.<br/>
This file will also contain the _controllers_ that will take care of Chirp's core functionalities (i.e. creating and displaying posts).<br/>
Then, we will create _index.html_ which will be our placeholder page for the other pages such as _main.html_, _login.html_, and _register.html_.<br/>
_index.html_ will use AngularJS and its directives to dynamically change views.<br/>
The _$scope_ object is incredibly important as it the _Model_ part of our Model-View-Controller.<br/>
The _$scope_ is shared between the controller and the view, and it is how data and functions are passed between the two.<br/>
Our _chirpApp.js_ also uses the _ngRoute_ module. This is a very important module used to handle the routes.<br/>
Next, we need to create an _app.js_ file which NodeJS will point to as Chirp's default page.<br/>
We need to do this in order to run our app on a HTTP Server and avoid any CORS errors when trying to load AngularJS.<br/>

// constants
var BASE_TEN = 10;

// var req = require('request');
var encrypt_util = require('./../util/encrypt_util.js')
var redis = require('redis');
var async = require('async');

var client = redis.createClient();
var _ = require('underscore');
var POSTS = "posts:";

// var async = require('async');


module.exports = {

	// set user's submit form into redis
	postPin: function (request, response) {
    var nextID;
    var parsedID;

    client.get("nextID", function(err, nextID) {
      nextID = JSON.parse(nextID);
      parsedID = parseInt(nextID, BASE_TEN);
			console.log("type: " + typeof parsedID);
			var fxns = [];

  		var auth_token = request.cookies['auth_token'];
  		if (!auth_token) {
				response.status(400).send('You are NOT logged in!');
        console.log("YOU ARE NOT LOGGED IN");
  			return;
  		}
      var data = request.body;
  		var username = encrypt_util.decrypt(auth_token);
			// adding username
			data.createdBy = username;
			data.createdAt = new Date();

			var task1 = function (done) {
        client.hmset(POSTS + username, parsedID, JSON.stringify(data), done);
			};
			fxns.push(task1);

			var task2 = function (done) {
				client.hmset(POSTS + "global", parsedID, JSON.stringify(data), done);
			};
			fxns.push(task2);

      parsedID++;
			var task3 = function (done) {
				client.set("nextID", parsedID, done);
			}
			fxns.push(task3);

			// finish all tasks and handles errors in 1 place
			async.parallel(fxns, function (err, data) {
				if (err) {
					response.status(500).send('There was an error in saving your data!');
				}
				response.redirect('/index.html');
			});

    });
  },


	getPins: function (request, response) {
		var username = encrypt_util.decrypt(request.cookies['auth_token']);
    client.hgetall(POSTS + "global", function (err, bookInfo) {
      if (bookInfo === null) {
        console.log("NO INFO YET");
      } else {
        response.json(bookInfo);
      }

    });
	},

  getMyPins: function (request, response) {
    var username = encrypt_util.decrypt(request.cookies['auth_token']);
    console.log("USERNAME: " + username);
    client.hgetall(POSTS + username, function (err, bookInfo) {
      if (bookInfo === null) {
        console.log("NO INFO YET");
      } else {
        console.log("my pins: " + JSON.stringify(bookInfo));
        response.json(bookInfo);
      }

    });
  },

	getUsername: function (request, response) {
		var username = encrypt_util.decrypt(request.cookies['auth_token']);
		console.log("HFISFDIAFAWEF:");
		response.json(username);
	}
};


// $("#loginSignupNav").replaceWith("<li><a href=&quot/logout?id=signout&quot id=&quotsignout&quot>Logout</a></li>");

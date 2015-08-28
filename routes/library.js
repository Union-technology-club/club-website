var express = require("express");
var Game = require("../models/Game");
var Order = require("../models/Order");
var async = require("async");
var route = module.exports = express.Router();
route.get("/", function (req, res, next) {
	return res.render("libray", {});
});
route.post("/checkout", function (req, res, next) {
	var body = req.body;
	Game.findById(body.id, function (err, game) {
		if (err) return res.json({ Status: "fail", err: err });
		if (game.Available < game.Quantity) {
			async.parallel({
				game: function (callback) {
					game.Available--;
					game.save(callback);
				},
				order: function (callback) {
					var o = new Order({User: 'TODO', Game: game});
					o.save(callback);
				}, function(err, results){
					if(err) return res.json({Status: 'fail', err: err});
					return res.json({Status: "success", result: results});
				}
			})
		} else {
			return res.json({ Status: "fail", err: "No copies available" });
		}

	});
});


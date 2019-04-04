const db = require("../models");

// /api/users/:id/activity
exports.createActivity = async function(req, res, next) {
	try {
		//create the new activity
		console.log("before session create");
		let activity = await db.Activity.create({
			title: req.body.title,
			isPrivate: req.body.isPrivate,
			description: req.body.description,
			activityPicture: req.body.activityPicture,
			userId: req.params.id,
			sessions: []
		});
		console.log("after activity create ----> activity", activity);
		//find the user, push the session id to the users sessions array
		let user = await db.User.findById(req.params.id);
		console.log("found user", user, "and the req.params.id", req.params.id);
		user.activities.push(activity.id);
		await user.save();
		// then go back and find that message and popualte it with the username and profile pic,
		//so we can immediately send it back to the front end with some additional info, not just the id
		let foundActivity = await db.Activity.findById(activity.id)
			.populate("userId", {
				username: true,
				profilePicture: true
			})
			.populate("sessions");
		return res.status(200).json(foundActivity);
	} catch (err) {
		return next(err);
	}
};

exports.getUserActivities = async function(req, res, next) {
	try {
		//first we'll find the suer
		let user = await db.User.findById(req.params.id)
			//sort them by created at
			.sort({ createdAt: "desc" })
			//then populate each with it's respective user username profile pic and notes
			.populate("activities", {
				title: true,
				isPrivate: true,
				description: true,
				activityPicture: true,
				sessions: true
			})
			.populate("sessions");
		//now that we have the activites populated, lets populate the sessions within that activity

		return res.status(200).json(user.activities);
	} catch (err) {
		return next(err);
	}
};

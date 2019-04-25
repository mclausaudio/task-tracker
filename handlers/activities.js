const db = require("../models");

// /api/users/:id/activity
exports.createActivity = async function(req, res, next) {
	try {
		//create the new activity
		let activity = await db.Activity.create({
			title: req.body.title,
			isPrivate: req.body.isPrivate,
			description: req.body.description,
			activityPicture: req.body.activityPicture,
			userId: req.params.id,
			sessions: []
		});
		//find the user, push the session id to the users sessions array
		let user = await db.User.findById(req.params.id);
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
//get all of a specific users activities
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

exports.getSpecificActivity = async function(req, res, next) {
	try {
		let activity = await db.Activity.findById(req.params.activity_id)
			.populate("userId", {
				username: true,
				profilePicture: true
			})
			.populate("sessions");

		return res.status(200).json(activity);
	} catch (err) {
		return next(err);
	}
};
exports.updateUserActivity = async function(req, res, next) {
	try {
		let updatedActivity = await db.Activity.findByIdAndUpdate(
			req.params.activity_id,
			req.body
		);
		console.log("udatedActivity", updatedActivity);
		// then go back and find that message and popualte it with the username and profile pic,
		//so we can immediately send it back to the front end with some additional info, not just the id
		let foundActivity = await db.Activity.findById(updatedActivity.id)
			.populate("userId", {
				username: true,
				profilePicture: true
			})
			.populate("sessions");
		console.log("found activity", foundActivity);
		return res.status(200).json(foundActivity);
	} catch (err) {
		return next(err);
	}
};
// /api/users/:id/activities/:activity_id
exports.deleteActivity = async function(req, res, next) {
	try {
		//we can not use mongoose findByIdAndRemove because our Session model has a pre remove hook
		let foundActivity = await db.Activity.findById(req.params.activity_id);
		console.log(foundActivity);
		await foundActivity.remove();
		return res.status(200).json(foundActivity);
	} catch (err) {
		return next(err);
	}
};

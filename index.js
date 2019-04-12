require("dotenv").config(); //dotenv npm package allows us to use this line of code to load any environment variables into index (process.env.____)
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const PORT = 8081;

const errorHandler = require("./handlers/error");

const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/sessions");
const activityRoutes = require("./routes/activities");

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
//dont forget to add middleware later, loginRequired and ensureCorrectUser
app.use(
	"/api/users/:id/activities",
	loginRequired,
	ensureCorrectUser,
	activityRoutes
);

app.use(
	"/api/users/:id/activities/:activity_id/sessions",
	loginRequired,
	ensureCorrectUser,
	sessionRoutes
);

//get all sessions from everyone
app.use("/api/sessions", loginRequired, async function(req, res, next) {
	try {
		//we are going to find all sessions
		let sessions = await db.Session.find()
			//sort them by created at
			.sort({ createdAt: "desc" })
			//then populate each with it's respective user username profile pic and notes
			.populate("userId", {
				username: true,
				profilePicture: true,
				notes: true
			});
		return res.status(200).json(sessions);
	} catch (err) {
		return next(err);
	}
});

//get all activities from everyone
app.use("/api/activities", loginRequired, async function(req, res, next) {
	try {
		//we are going to find all sessions
		let activities = await db.Activity.find()
			//sort them by created at
			.sort({ createdAt: "desc" })
			//then populate each with it's respective user username profile pic and notes
			.populate("userId", {
				username: true,
				profilePicture: true,
				notes: true
			})
			.populate("sessions");

		return res.status(200).json(activities);
	} catch (err) {
		return next(err);
	}
});

//If none of the routes are reached, run this function
app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

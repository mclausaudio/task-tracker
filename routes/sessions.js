const express = require("express");
//mergeParams allows us to access the req.params.id from inside the router
const router = express.Router({ mergeParams: true });

const {
	createSession,
	getSession,
	updateSession,
	deleteSession
} = require("../handlers/sessions");

// /api/users /: id / activities /: activity_id / sessions
//create, dont need to get all sessions of a specific activity ---> that is done in activities
router.route("/").post(createSession);

//read, update delete
router
	.route("/:session_id")
	.get(getSession) //get a single session
	.post(updateSession) //update a session
	.delete(deleteSession); // delete a single session

module.exports = router;

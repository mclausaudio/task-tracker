const express = require("express");
//mergeParams allows us to access the req.params.id from inside the router
const router = express.Router({ mergeParams: true });

const { createActivity, getUserActivities } = require("../handlers/activities");

//prefix all routes with /api/users/:id/activities
router
	.route("/")
	.get(getUserActivities)
	.post(createActivity);

// router
// 	.route("/:activity_id")
// 	.get(getSession)
// 	.delete(deleteSession);

module.exports = router;

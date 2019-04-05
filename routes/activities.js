const express = require("express");
//mergeParams allows us to access the req.params.id from inside the router
const router = express.Router({ mergeParams: true });

const {
	createActivity,
	getUserActivities,
	getSpecificActivity,
	updateUserActivity,
	deleteActivity
} = require("../handlers/activities");

//prefix all routes with /api/users/:id/activities
router
	.route("/")
	.get(getUserActivities)
	.post(createActivity);

router
	.route("/:activity_id")
	.get(getSpecificActivity)
	.delete(deleteActivity)
	.post(updateUserActivity);

module.exports = router;

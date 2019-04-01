const express = require("express");
//mergeParams allows us to access the req.params.id from inside the router
const router = express.Router({ mergeParams: true });

const { createSession } = require("../handlers/sessions");

//prefix all routes with /api/users/:id/sessions
router.route("/").post(createSession);

module.exports = router;

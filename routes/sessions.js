const express = require("express");
//mergeParams allows us to access the req.params.id from inside the router
const router = express.Router({ mergeParams: true });

const {
  createSession,
  getSession,
  deleteSession
} = require("../handlers/sessions");

//prefix all routes with /api/users/:id/sessions
router.route("/").post(createSession);

router
  .route("/:session_id")
  .get(getSession)
  .delete(deleteSession);

module.exports = router;

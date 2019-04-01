const db = require("../models");

// /api/users/:id/sessions
exports.createSession = async function(req, res, next) {
  try {
    //create the new sessions
    console.log("before session create");
    let session = await db.Session.create({
      dateCreated: Date.now(),
      userId: req.params.id,
      lastSessionDate: undefined,
      totalTimeSpent: undefined,
      lastSessionStart: undefined,
      lastSessionEnd: undefined,
      notes: req.body.notes
    });
    console.log("after session create ----> session", session);
    //find the user, push the session id to the users sessions array
    let user = await db.User.findById(req.params.id);
    console.log("found user", user, "and the req.params.id", req.params.id);
    user.sessions.push(session.id);
    await user.save();
    // then go back and find that message and popualte it with the username and profile pic,
    //so we can immediately send it back to the front end with some additional info, not just the id
    let foundSession = await db.Session.findById(session.id).populate(
      "userId",
      {
        username: true,
        profilePicture: true
      }
    );
    return res.status(200).json(foundSession);
  } catch (err) {
    return next(err);
  }
};

// export.getSession = async function (req, res, next) {

// }

// export.deleteSession = async function (req, res, next) {

// }

// export.updateSession = async function (req, res, next) {

// }

const db = require("../models");

// /api/users/:id/sessions
exports.createSession = async function(req, res, next) {
  try {
    //create the new sessions
    console.log("before session create");
    let session = await db.Session.create({
      userId: req.params.id,
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

// /api/users/:id/sessions/session_id
exports.getSession = async function(req, res, next) {
  console.log("right before try in getSession");
  try {
    //find session by id
    console.log(
      "inside getSession handler try statement, the session_id is",
      req.params.session_id
    );
    let session = await db.Session.findById(req.params.session_id);
    return res.status(200).json(session);
  } catch (err) {
    return next(err);
  }
};

// /api/users/:id/sessions/session_id
exports.deleteSession = async function(req, res, next) {
  try {
    //we can not use mongoose findByIdAndRemove because our Session model has a pre remove hook
    let foundSession = await db.Session.findById(req.params.session_id);
    await foundSession.remove();
    return res.status(200).json(foundSession);
  } catch (err) {
    return next(err);
  }
};
// /api/users/:id/sessions/session_id
// export.updateSession = async function (req, res, next) {

// }

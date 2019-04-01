const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function() {};

//try catch statements in all async functions
exports.signup = async function(req, res, next) {
  try {
    //create a user
    let newUser = await db.User.create(req.body);
    let { id, username, profilePicture } = newUser;
    //create a token (sign a token)
    let token = jwt.sign(
      {
        id,
        username,
        profilePicture
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      username,
      profilePicture,
      token
    });
    // process.env
  } catch (err) {
    // see what kind of error, 11000 means the validation failed
    if (err.code === 11000) {
      err.message = "Sorry, that username or email is taken.";
    }
    // or else send back a generic 400
    return next({
      status: 400,
      message: err.message
    });
  }
};

// require("dotenv").load();

const jwt = require("jsonwebtoken");

//can't use async functions because jsonwebtoken still uses a callback pattern

//authorization - function to make sure the user is logged in
exports.loginRequired = function(req, res, next) {
  //even though its not async we can still use a try catch, this way is req.headers has issues or returns undefined, it doesn't break the code
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      // if decoded, we're done, have the user move on
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please login first"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please login first"
    });
  }
};
//authentication - another to make sure we get the correct user
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id == req.params.id) {
        next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
};

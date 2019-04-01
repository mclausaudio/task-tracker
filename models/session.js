const mongoose = require("mongoose");
const User = require("./user");

const sessionSchema = new mongoose.Schema({
  dateCreated: Date,
  lastSessionDate: Date,
  totalTimeSpent: Number,
  lastSessionStart: Date,
  lastSessionEnd: Date,
  notes: {
    type: String,
    maxlength: 200
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

//mongoose middleware hook function before any Session is removed
//to find the User that the removed message is associated with, and take out this session id from the users session array
sessionSchema.pre("remove", async function(next) {
  try {
    //find the user
    let user = await User.findById(this.userId);
    //remove the id from the users sessions array
    user.sessions.remove(this.id);
    //save the user
    await user.save();
    //return next to continue on
    return next();
  } catch (err) {
    return next(err);
  }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;

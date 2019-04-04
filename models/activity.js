const mongoose = require("mongoose");
const User = require("./user");
const Session = require("./session");

const activitySchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		isPrivate: Boolean,
		description: {
			type: String,
			maxlength: 1000
		},
		activityPicture: String,
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }]
	},
	{ timestamps: true }
);

//when I delete am activity I want to remove all of the sessions that have it's activity ID
activitySchema.pre("remove", async function(next) {
	try {
		//find all the sessions with this activity id and remove them
		Session.find({ activityId: this._id }).remove();
		//now grab the user
		let user = await User.findById(this.userId);
		//remove the id from the users activity array
		user.activites.remove(this.id);
		//save the user
		await user.save();
		//return next to continue on
		return next();
	} catch (err) {
		return next(err);
	}
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profilePicture: {
		type: String
	},
	dateJoined: Date,
	city: String,
	bio: String,
	activities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Activity"
		}
	],
	sessions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Session"
		}
	]
});

//adding a hook below, to run right before an instance of this model gets 'saved'
userSchema.pre("save", async function(next) {
	try {
		//if you have not changed the password, skip
		if (!this.isModified("password")) {
			return next();
		}
		//this will re hash the password when the user changes their pw
		//'THIS' refers to the actual user object created from the model
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
});

//a helper function, or an instance method..  so every users object created from this model will have this function
userSchema.methods.comparePassword = async function(candidatePassword, next) {
	try {
		//below is an async func that returns true or false.. is async so need to 'await'
		//'THIS' refers to the actual user object created from the model
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;

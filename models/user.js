var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")
	


var mongoose = require("mongoose")


var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	habits: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Habit"			
		}
	],
	selected: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SelectedHabit"
		}
	]
	
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)
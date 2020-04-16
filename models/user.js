var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")
	// SelectedHabit = require('./selectedHabit.js'),
	// SelectedHabitSchema = mongoose.model('SelectedHabit').schema,
	// Schema = mongoose.Schema;


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
	selectedList : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SelectedHabit"			
		}
	]
	
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)
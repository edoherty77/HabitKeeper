var mongoose = require("mongoose")

var SelectedHabitSchema = new mongoose.Schema({
	
		habit : [String],
		date : [String]
	
})

module.exports = mongoose.model("SelectedHabit", SelectedHabitSchema)
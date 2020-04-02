var mongoose = require("mongoose")

var SelectedHabitSchema = new mongoose.Schema({
	selected: String
})

module.exports = mongoose.model("SelectedHabit", SelectedHabitSchema)
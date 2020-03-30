var mongoose = require("mongoose")

var habitSchema = new mongoose.Schema({
	habit: String
})

module.exports = mongoose.model("Habit", habitSchema)
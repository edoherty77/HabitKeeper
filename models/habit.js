var mongoose = require("mongoose")

var habitSchema = new mongoose.Schema({
	habit: String,
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	}
})

module.exports = mongoose.model("Habit", habitSchema)
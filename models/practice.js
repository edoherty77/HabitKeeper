var mongoose = require("mongoose")

var PracticeSchema = new mongoose.Schema({
	selected: {String, String}
})

module.exports = mongoose.model("Practice", PracticeSchema)
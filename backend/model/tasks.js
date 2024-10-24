const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  completed: { type: Boolean, required: true },
});

const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;

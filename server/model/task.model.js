import mongoose from "mongoose";

import { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: String,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

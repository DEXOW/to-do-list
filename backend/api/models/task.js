import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Task Name"],
        maxLength: [30, "Task Name cannot exceed 30 characters"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    list: {
        type: mongoose.Schema.ObjectId,
        ref: "List",
        required: true,
    },
});

export default mongoose.model("Task", taskSchema);
import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter List Name"],
        maxLength: [30, "List Name cannot exceed 30 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export default mongoose.model("List", listSchema);
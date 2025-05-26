const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["2D", "3D"], required: true },
    createdAt: { type: Date, default: Date.now },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = { Workspace };

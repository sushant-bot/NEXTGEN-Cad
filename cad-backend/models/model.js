const mongoose = require("mongoose");
const ModelSchema = new mongoose.Schema({
    name: String,
    path: String,
    uploadedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Model", ModelSchema);

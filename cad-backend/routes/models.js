const express = require("express");
const multer = require("multer");
const Model = require("../models/Model");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Upload Model
router.post("/upload", upload.single("model"), async (req, res) => {
    const newModel = new Model({ name: req.file.originalname, path: req.file.path });
    await newModel.save();
    res.json({ message: "File uploaded successfully!", model: newModel });
});

// Get All Models
router.get("/", async (req, res) => {
    const models = await Model.find();
    res.json(models);
});

module.exports = router;

const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

router.post("/slice", (req, res) => {
    exec("cura-engine slice -v -m model.stl", (error, stdout) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ gcode: stdout });
    });
});

module.exports = router;

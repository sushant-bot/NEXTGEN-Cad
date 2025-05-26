const express = require("express");
const router = express.Router();
const { Workspace } = require("../models/workspace");

// Create a new workspace
router.post("/create", async (req, res) => {
    try {
        const { name, userId, type } = req.body; // type: 2D or 3D
        const newWorkspace = new Workspace({ name, userId, type });
        await newWorkspace.save();
        res.status(201).json({ message: "Workspace created!", workspace: newWorkspace });
    } catch (error) {
        res.status(500).json({ error: "Failed to create workspace" });
    }
});

// Get all workspaces for a user
router.get("/:userId", async (req, res) => {
    try {
        const workspaces = await Workspace.find({ userId: req.params.userId });
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve workspaces" });
    }
});

// Update workspace details
router.put("/:id", async (req, res) => {
    try {
        const updatedWorkspace = await Workspace.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Workspace updated!", workspace: updatedWorkspace });
    } catch (error) {
        res.status(500).json({ error: "Failed to update workspace" });
    }
});

// Delete a workspace
router.delete("/:id", async (req, res) => {
    try {
        await Workspace.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Workspace deleted!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete workspace" });
    }
});

module.exports = router;

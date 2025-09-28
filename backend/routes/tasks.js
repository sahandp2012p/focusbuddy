// backend/routes/tasks.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth"); // ✅ JWT auth middleware

// ===== CREATE a new task =====
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Task title is required" });
    }

    const newTask = new Task({
      userId: req.user.id, // user injected by auth middleware
      title: title.trim(),
      completed: false,
    });

    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Server error while creating task" });
  }
});

// ===== GET all tasks for logged-in user =====
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json(tasks); // ✅ send plain array
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Server error while fetching tasks" });
  }
});

// ===== DELETE a task =====
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found or not authorized" });
    }

    return res.json({ success: true, id: req.params.id });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Server error while deleting task" });
  }
});

// ===== TOGGLE completed status =====
router.patch("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found or not authorized" });
    }

    task.completed = !task.completed;
    await task.save();

    return res.json(task);
  } catch (error) {
    console.error("Error toggling task:", error);
    return res.status(500).json({ error: "Server error while updating task" });
  }
});

module.exports = router;

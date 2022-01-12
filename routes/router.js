const express = require("express");
const { message } = require("statuses");
const router = express.Router();
const Todo = require("../models/Todo");

//GET ALL
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//GET ONE
router.get("/:id", getTodo, (req, res) => {
    res.json(res.todo);
});

// CREATE ONE
router.post("/", async (req, res) => {
    const todo = new Todo({
        taskName: req.body.taskName,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATING ONE
router.patch("/:id", getTodo, async (req, res) => {
    if (res.todo.completed) res.todo.completed = false;
    else res.todo.completed = true;
    const updated = await res.todo.save();
    try {
        res.status(202).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//DELETING ONE
router.delete("/:id", getTodo, async (req, res) => {
    try {
        let deleted = await Todo.remove(res.todo);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//MIDLEWARE GetTodo by ID if exists.
async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) return res.status(404).json({ message: "Cant find todo." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.todo = todo;
    next();
}

module.exports = router;

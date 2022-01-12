const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("tasklist", todoSchema);

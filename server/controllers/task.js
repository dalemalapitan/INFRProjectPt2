// Import Task model
const Task = require(../models.task");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, priority, status, dueDate } = req.body;

    const newTask = new Task({
      title,
      priority,
      status,
      dueDate,

    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully!", task: newTask });
  } catch (error) {
    res.status(500.json({ error: "Failed to create task." });
  }
};

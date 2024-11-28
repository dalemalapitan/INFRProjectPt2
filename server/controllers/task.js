// Import Task model
const Task = require(../models.task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("Task/list", { tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Server Error");
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { Title, Description, Priority, Status, dueDate } = req.body;
    const newTask = new Task({
      Title,
      Decription,
      Priority,
      Status,
      DueDate,
    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully!", task: newTask });
  } catch (error) {
    res.status(500.json({ error: "Failed to create task." });
  }
};

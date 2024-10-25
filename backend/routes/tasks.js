const router = require("express").Router();
const { authentication } = require("../utils");
const Tasks = require("../model/tasks");

router.post("/tasks", authentication, async (req, res) => {
  try {
    const { name, description, completed } = req.body;

    const newTask = new Tasks({ name, description, completed });

    await newTask.save();

    return res.status(201).json({
      status: true,
      message: "New task created",
    });
  } catch (error) {
    console.log("error while creating task", error);
    return res.status(500).json({
      statu: false,
      message: error,
    });
  }
});

router.get("/tasks", authentication, async (req, res) => {
  try {
    const allTasks = await Tasks.find();
    return res.status(200).json({
      status: true,
      data: allTasks,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    console.log("error while getting task", error);
    return res.status(500).json({
      statu: false,
      message: error,
    });
  }
});

router.put("/tasks", authentication, async (req, res) => {
  try {
    const { taskId, taskStatus } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { completed: taskStatus },
      { new: true, useFindAndModify: false }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.log("error while updating task", error);
    return res.status(500).json({
      statu: false,
      message: error,
    });
  }
});

router.delete("/tasks", authentication, async (req, res) => {
  try {
    const { taskId } = req.body;
    const deletedTask = await Tasks.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }

    res.status(200).json({
      status: true,
      message: `Task with ID ${taskId} deleted successfully`,
    });
  } catch (error) {
    console.log("error in deleting", error);
    res.status(500).json({
      status: false,
      message: "Error in deleting task",
    });
  }
});

module.exports = router;

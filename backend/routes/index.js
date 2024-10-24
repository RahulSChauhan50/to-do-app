const router = require("express").Router();
const UserRouter = require("./user");
const TasksRouter = require("./tasks");

router.use("/user", UserRouter);
router.use("/task", TasksRouter);

module.exports = router;

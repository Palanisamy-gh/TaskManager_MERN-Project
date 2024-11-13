import express from "express";

import {
  createTask,
  getAllTasks,
  updateTasks,
  deleteTasks,
} from "../controller/task.controller.js";

const router = express.Router();

router.post("/", createTask);

router.get("/", getAllTasks);

router.put("/:id", updateTasks);

router.delete("/:id", deleteTasks);

export default router;

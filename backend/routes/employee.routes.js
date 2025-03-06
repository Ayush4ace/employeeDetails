import express from "express";
import { upload, processImage } from "../middlewares/upload.js";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../controller/employee.controller.js";
const router = express.Router();

router.post("/createEmployee", upload.single("profileImage"), processImage, createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", upload.single("profileImage"), processImage, updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
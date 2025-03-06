import { Employee } from "../models/employee.models.js";

// create Employee

export async function createEmployee(req, res){
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        return res.status(201).json({
            message: "Employee created successfully",
            success: true,
            error: false,
            newEmployee
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}


// get all the employees 

export async function getAllEmployees(req, res){
    try {
        const employees = await Employee.find();
        return res.status(200).json({
            message: "employee fetched successfully",
            success: true,
            employees
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

// get employees by id

export async function getEmployeeById(req, res){
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);
        if(!employee){
            return res.status(404).json({
                message: "employee not found",
                success: false,
                error: true
            });
        }
        return res.status(200).json({
            message: "employee fetched successfully",
            success: true,
            employee
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

// update the Employee 

export async function updateEmployee(req, res){
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findByIdAndUpdate(employeeId, req.body, {new: true});
        if(!employee){
            return res.status(404).json({
                message: "employee not found",
                success: false,
                error: true
            });
        }
        return res.status(200).json({
            message: "employee updated successfully",
            success: true,
            employee
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}


// delete employee

export async function deleteEmployee(req, res){
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findByIdAndDelete(employeeId);

        return res.status(200).json({
            message: "employee deleted successfully",
            success: true,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

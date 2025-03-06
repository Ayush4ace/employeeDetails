import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/employee";

// Fetch all employees
export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add employee
export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employee) => {
    const res = await axios.post(`${API_URL}/createEmployee`, employee);
    return res.data.newEmployee;
  }
);

// Update employee
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: { lists: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.lists = action.payload.employees || [];
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.lists.findIndex(
          (emp) => emp._id === action.payload._id
        );
        if (index !== -1) state.lists[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.lists = state.lists.filter((emp) => emp._id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;

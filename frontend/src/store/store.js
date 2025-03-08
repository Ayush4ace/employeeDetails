import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import formReducer from "./formSlice"; // Import formSlice reducer

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    form: formReducer, // Add form reducer
  },
});

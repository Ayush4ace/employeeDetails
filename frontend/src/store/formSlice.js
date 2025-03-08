import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    skills: [],
    education: [],
    profileImage: null,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;

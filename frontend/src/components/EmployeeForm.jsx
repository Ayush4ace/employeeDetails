import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../store/employeeSlice";
import Cropper from "react-easy-crop";
import { Card, CardContent } from "@/components/ui/card";
import imageCompression from "browser-image-compression";

const EmployeeForm = ({ editingEmployee, setEditing }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    skills: "",
    profileImage: null,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (editingEmployee) setFormData(editingEmployee);
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      // Compress image before uploading
      const options = {
        maxSizeMB: 1, // Reduce file size to 1MB
        maxWidthOrHeight: 800, // Resize image if needed
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({ ...formData, profileImage: reader.result });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { ...formData, skills: formData.skills.split(",") };

    if (editingEmployee) {
      dispatch(updateEmployee({ id: editingEmployee._id, data: employeeData }));
    } else {
      dispatch(addEmployee(employeeData));
    }

    setEditing(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      skills: "",
      profileImage: null,
    });
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />

          {/* File Upload */}
          <label className="cursor-pointer bg-gray-200 p-2 rounded block text-center">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Image Cropper */}
          {formData.profileImage && (
            <div className="relative w-full h-64 mt-2">
              <Cropper
                image={formData.profileImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-black text-white p-2 rounded"
          >
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../store/employeeSlice";
import { setFormData } from "../store/formSlice"; // New Redux action to store form data
import Cropper from "react-easy-crop";
import { Card, CardContent } from "@/components/ui/card";
import imageCompression from "browser-image-compression";

const EmployeeForm = ({ editingEmployee, setEditing }) => {
  const dispatch = useDispatch();
  const storedFormData = useSelector((state) => state.formData);

  const [formData, setLocalFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    skills: [],
    education: [],
    profileImage: null,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (editingEmployee) {
      setLocalFormData(editingEmployee);
      dispatch(setFormData(editingEmployee)); // Store initial edit data in Redux
    } else if (storedFormData) {
      setLocalFormData(storedFormData); // Restore unsaved form data
    }
  }, [editingEmployee, storedFormData, dispatch]);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setLocalFormData(updatedData);
    dispatch(setFormData(updatedData)); // Store data in Redux
  };

  const handleAddSkill = () => {
    const updatedData = { ...formData, skills: [...formData.skills, ""] };
    setLocalFormData(updatedData);
    dispatch(setFormData(updatedData));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    const updatedData = { ...formData, skills: updatedSkills };
    setLocalFormData(updatedData);
    dispatch(setFormData(updatedData));
  };

  const handleRemoveSkill = (index) => {
    const updatedData = {
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    };
    setLocalFormData(updatedData);
    dispatch(setFormData(updatedData));
  };

  const handleAddEducation = () => {
    const updatedData = {
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", yearOfCompletion: "" },
      ],
    };
    setLocalFormData(updatedData);
    dispatch(setFormData(updatedData));
  };

 const handleEducationChange = (index, field, value) => {
   const updatedEducation = formData.education.map((edu, i) =>
     i === index ? { ...edu, [field]: value } : edu
   );

   const updatedData = { ...formData, education: updatedEducation };
   setLocalFormData(updatedData);
   dispatch(setFormData(updatedData));
 };


  const handleRemoveEducation = (index) => {
    const updatedData = {
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    };
    setLocalFormData(updatedData);
    dispatch(setFormData(updatedData));
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = () => {
          const updatedData = { ...formData, profileImage: reader.result };
          setLocalFormData(updatedData);
          dispatch(setFormData(updatedData));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      dispatch(updateEmployee({ id: editingEmployee._id, data: formData }));
    } else {
      dispatch(addEmployee(formData));
    }
    dispatch(setFormData(null)); // Clear stored data after submission
    setEditing(null);
    setLocalFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      skills: [],
      education: [],
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

          <label>Skills:</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="ml-2 bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSkill}
            className="w-full bg-blue-500 text-white p-2 rounded mb-2"
          >
            Add Skill
          </button>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="number"
                placeholder="Year of Completion"
                value={edu.yearOfCompletion}
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "yearOfCompletion",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded mb-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="w-full bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className="w-full bg-blue-500 text-white p-2 rounded mb-2"
          >
            Add Education
          </button>

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

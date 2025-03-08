import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
    skills: [],
    education: [],
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

  const handleAddSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", yearOfCompletion: "" },
      ],
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
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
    if (editingEmployee) {
      dispatch(updateEmployee({ id: editingEmployee._id, data: formData }));
    } else {
      dispatch(addEmployee(formData));
    }
    setEditing(null);
    setFormData({
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

          <label>Education:</label>
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
          {/* file upload */}
          <label className="cursor-pointer bg-gray-200 p-2 rounded block text-center">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* image cropper  */}
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

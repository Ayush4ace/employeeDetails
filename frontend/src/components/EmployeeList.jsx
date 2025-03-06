import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../store/employeeSlice";
import { useNavigate } from "react-router-dom";

const EmployeeList = ({ setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lists = [] } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <ul>
        {lists.map((emp) => (
          <li
            key={emp._id}
            className="flex justify-between bg-gray-100 p-2 rounded"
          >
            <strong>
              {emp.name} - {emp.department}
            </strong>
            <div>
              <button
                onClick={() => navigate(`/edit/${emp._id}`)}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteEmployee(emp._id))}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;

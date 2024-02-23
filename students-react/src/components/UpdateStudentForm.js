import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CONSTANTS from "../data/config";

const UpdateStudentForm = ({ studentInfo, isEditing, setIsEditing }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState(studentInfo);

  useEffect(() => {
    setFormData(studentInfo);
  }, [studentInfo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${CONSTANTS.BASE_API_URL}students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setIsEditing(false);
    // refresh the page
    // window.location.reload();
  };

  if (!isEditing) {
    return (
      <div>
        <p>
          Name: {formData.FirstName} {formData.LastName}
        </p>
        <p>School: {formData.School}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.FirstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.LastName}
          onChange={handleChange}
        />
      </label>
      <label>
        School:
        <input
          type="text"
          name="school"
          value={formData.School}
          onChange={handleChange}
        />
      </label>
      <button className="btn btn-success" type="submit">
        Update Student
      </button>
    </form>
  );
};

export default UpdateStudentForm;

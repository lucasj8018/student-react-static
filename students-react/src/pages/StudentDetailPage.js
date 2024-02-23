import React from "react";
import { useParams } from "react-router-dom";
import StudentList from "../components/StudentList";
import NotFoundPage from "./NotFoundPage";
import CONSTANTS from "../data/config";
import AddStudentForm from "../components/AddStudentForm";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import UpdateStudentForm from "../components/UpdateStudentForm";

const StudentDetailPage = () => {
  const navigate = useNavigate();
  // JavaScript code goes here
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState({
    FirstName: "",
    LastName: "",
    School: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${CONSTANTS.BASE_API_URL}students/${id}`);
      const body = await result.json();
      // console.log(body);
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);

  // Delete a student
  const handleDelete = async () => {
    await fetch(`${CONSTANTS.BASE_API_URL}${id}`, {
      method: "DELETE",
    });
    // Redirect to the list page
    navigate("/list");
  };

  if (!studentInfo) return <NotFoundPage />;

  return (
    <React.Fragment>
      <p style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        <StudentList exceptId={studentInfo.StudentId} />
      </p>

      <h4 className="text-danger">Student ID={studentInfo.StudentId}</h4>
      <button
        className="btn btn-success"
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "Cancel" : "Edit"}
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      <UpdateStudentForm
        studentInfo={studentInfo}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <div style={{ width: "50%", float: "left" }}>
        <AddStudentForm />
      </div>
    </React.Fragment>
  );
};
export default StudentDetailPage;

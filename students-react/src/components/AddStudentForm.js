import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../data/config";

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [School, setSchool] = useState("");
  // const [addFlag, setAddFlag] = useState(false);

  const addStudent = (e) => {
    e.preventDefault();
    const result = fetch(`${CONSTANTS.BASE_API_URL}students/`, {
      method: "post",
      body: JSON.stringify({
        FirstName,
        LastName,
        School,
      }),
      headers: { "Content-Type": "application/json" },
    });
    result
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/list");
      })
      .catch((error) => console.error("Error:", error));
    // setAddFlag(true);
  };

  // if (addFlag) {
  //   return <Navigate to={{ pathname: "/list", state: { refresh: true } }} />;
  // }

  return (
    <React.Fragment>
      <div className="panel panel-default">
        <form>
          <h3>Add Student</h3>
          <div className="form-group">
            <label>First Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              value={FirstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              value={LastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>School:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Occupation"
              value={School}
              onChange={(event) => setSchool(event.target.value)}
            />
          </div>

          <input
            type="submit"
            onClick={(e) => addStudent(e)}
            className="btn btn-success"
            value="Add"
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddStudentForm;

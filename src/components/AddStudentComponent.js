import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StudentService from "../services/StudentService";

const AddStudentComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [department, setDepartment] = useState("");
  const history = useNavigate();
  const { id } = useParams();

  const saveOrUpdateStudent = (e) => {
    e.preventDefault();
    const student = { firstName, lastName, emailId, department };

    if (id) {
      StudentService.updateStudent(id, student)
        .then((response) => {
          history("/students");
        })
        .catch((error) => {
          console.error("Error updating student:", error.response);
          alert(
            "Error updating student: " +
              (error.response?.data?.message || "Internal Server Error")
          );
        });
    } else {
      StudentService.createStudent(student)
        .then((response) => {
          history("/students");
        })
        .catch((error) => {
          console.error("Error creating student:", error.response);
          alert(
            "Error creating student: " +
              (error.response?.data?.message || "Internal Server Error")
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      StudentService.getStudentById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmailId(response.data.emailId);
          setDepartment(response.data.department);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const title = () => {
    return id ? (
      <h2 className="text-center">Update Student</h2>
    ) : (
      <h2 className="text-center">Add Student</h2>
    );
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">First Name :</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Last Name :</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Email Id :</label>
                  <input
                    type="email"
                    placeholder="Enter email Id"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Department :</label>
                  <input
                    type="text"
                    placeholder="Enter department"
                    name="department"
                    className="form-control"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateStudent(e)}
                >
                  Submit
                </button>
                <Link to="/students" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentComponent;

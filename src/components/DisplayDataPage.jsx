import React, { useEffect, useState } from "react";
import axios from "axios";
import "animate.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

const DisplayDataPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/registration/user/get-user"
        );
        setUserData(response.data);
        // console.log(response.data, "data")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (resumePath) => {
    const link = document.createElement("a");
    link.href = `http://localhost:4000/${resumePath}`;
    link.download = "resume.docx";
    link.click();
  };

  return (
    <div className="container mt-5">
      <h2>VIEW ALL USERS</h2>
      <table>
        <thead>
          <tr className="head">
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>State</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user._id} className={index % 2 == 0 ? "even-row animate__animated animate__fadeInLeft" : "odd-row animate__animated animate__fadeInRight"}>
              <td>{user.name}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.hobbies}</td>
              <td>{user.state}</td>
              <td>{user.address}</td>
              <td>
                <button
                  className="btn download-btn"
                  onClick={() => handleDownload(user.resumePath)}
                >
                  Download Resume
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayDataPage;

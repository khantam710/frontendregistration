import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import {
  MDBCheckbox,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  MDBFile,
  MDBTextArea,
} from "mdb-react-ui-kit";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    hobbies: [],
    state: "",
    address: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (hobby) => {
    const updatedHobbies = formData.hobbies.includes(hobby)
      ? formData.hobbies.filter((h) => h !== hobby)
      : [...formData.hobbies, hobby];

    setFormData({ ...formData, hobbies: updatedHobbies });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "docx") {
        setFormData({ ...formData, resume: file });
      } else {
        toast.error("Please upload a .docx file.");
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async () => {
    // Validation checks
    if (
      !formData.name ||
      !formData.dob ||
      !formData.gender ||
      !formData.resume
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (formData.hobbies.length < 2) {
      toast.error("Please select at least two hobbies.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("hobbies", formData.hobbies.join(","));
      formDataToSend.append("state", formData.state);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("resume", formData.resume);

      await axios.post(
        "http://localhost:4000/registration/user/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset the form after successful submission
      setFormData({
        name: "",
        dob: "",
        gender: "",
        hobbies: [],
        state: "",
        address: "",
        resume: null,
      });

      // Show success toast notification
        toast.success("Registration successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, 
        });
      } catch (error) {
        console.error("Error during registration:", error);
        // Show error toast notification
        toast.error("Error during registration. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
  };


  return (
    <>
      <MDBContainer fluid className="bg-dark">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="my-4">
              <MDBRow className="g-0">
                <MDBCol md="6" className="d-none d-md-block animated-image">
                  <MDBCardImage
                    src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
                    alt="Sample photo"
                    className="rounded-start"
                    fluid
                  />
                </MDBCol>

                <MDBCol md="6" className="bg">
                  <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-around">
                      <h3 className="mb-5 text-uppercase fw-bold">
                        registration form
                      </h3>

                      <span className="ms-5">
                        <Button variant="dark">
                          <Link
                            to="/display"
                            className="text-decoration-none text-white"
                          >
                            Display All Users
                          </Link>
                        </Button>
                      </span>
                    </div>

                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Name"
                          size="lg"
                          id="form1"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="custom-input"
                          name="name"
                          required
                        />
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Date Of Birth"
                          size="lg"
                          id="form2"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          name="dob"
                          className="custom-input"
                          required
                        />
                      </MDBCol>
                    </MDBRow>

                    <div className="d-md-flex ustify-content-start align-items-center mb-4 custom-input">
                      <h6 className="mb-0 me-4">Gender: </h6>
                      <MDBRadio
                        name="gender"
                        value="Female"
                        label="Female"
                        inline
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                      />
                      <MDBRadio
                        name="gender"
                        value="Male"
                        label="Male"
                        inline
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                      />
                      <MDBRadio
                        name="gender"
                        className="custom-input"
                        value="Other"
                        label="Other"
                        inline
                        checked={formData.gender === "Other"}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="d-md-flex ustify-content-start align-items-center mb-4 custom-input">
                      <h6 className="mb-0 me-4">Hobbies: </h6>
                      <MDBCheckbox
                        name="hobbies"
                        id="inlineRadio1"
                        value="Reading"
                        label="Reading"
                        inline
                        checked={formData.hobbies.includes("Reading")}
                        onChange={() => handleCheckboxChange("Reading")}
                      />
                      <MDBCheckbox
                        name="hobbies"
                        id="inlineRadio1"
                        value="Dancing"
                        label="Dancing"
                        inline
                        checked={formData.hobbies.includes("Dancing")}
                        onChange={() => handleCheckboxChange("Dancing")}
                      />

                      <MDBCheckbox
                        name="hobbies"
                        id="inlineRadio2"
                        value="Skating"
                        label="Skating"
                        inline
                        checked={formData.hobbies.includes("Skating")}
                        onChange={() => handleCheckboxChange("Skating")}
                      />
                      <MDBCheckbox
                        name="hobbies"
                        id="inlineRadio3"
                        value="Cycling"
                        label="Cycling"
                        inline
                        checked={formData.hobbies.includes("Cycling")}
                        onChange={() => handleCheckboxChange("Cycling")}
                      />
                    </div>

                    <div className="d-md-flex ustify-content-start align-items-center mb-4 custom-input">
                      <h6 className="mb-0 me-4">State: </h6>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                      </select>
                    </div>

                    <div className="d-md-flex ustify-content-start align-items-center mb-4 custom-input">
                      <MDBRow className="align-items-center pt-4 pb-3">
                        <MDBCol>
                          <h6 className="mb-0">Upload resume</h6>
                        </MDBCol>

                        <MDBCol md="9" className="pe-5">
                          <MDBFile
                            size="lg"
                            id="customFile"
                            onChange={handleFileChange}
                            name="resume"
                          />
                          <div className="small text-muted mt-2">
                            Upload your Resume (Only docx extension file allowed)
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </div>

                    <div className="d-md-flex ustify-content-start align-items-center mb-4 custom-input">
                      <h6 className="mb-0 me-4">Address: </h6>
                      <MDBTextArea
                        label=""
                        id="textAreaExample"
                        rows={3}
                        cols={60}
                        value={formData.address}
                        onChange={handleInputChange}
                        name="address"
                      />
                    </div>

                    <div className="d-flex justify-content-end pt-3 custom-input">
                      <MDBBtn
                        color="light"
                        size="lg"
                        noRipple
                        className="custom-btn"
                        onClick={() =>
                          setFormData({
                            name: "",
                            dob: "",
                            gender: "",
                            hobbies: [],
                            state: "",
                            address: "",
                            resume: null,
                          })
                        }
                      >
                        Reset all
                      </MDBBtn>
                      <MDBBtn
                        className="ms-2 custom-btn"
                        color="warning"
                        size="lg"
                        noRipple
                        onClick={handleSubmit}
                      >
                        Submit form
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;

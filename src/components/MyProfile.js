import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import NavbarCom from "./NavbarCom";
import "../styling/Profile.css";
import { Modal, Button, Form } from "react-bootstrap";
import Robot from "./Robot";
import { BsCheckBox } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
function MyProfile() {
  // const [showing, setShowing] = useState(false);
  const [onEditingMode, isOnEditingMode] = useState(false);
  const [printedImage, setPrintedImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [signedInUserInfo, setSignedInUserInfo] = useState({});
  const [userData, setUserData] = useState({
    userName: "",
    lastName: "",
    mobile: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { userName, lastName, mobile, image } = userData;

  const fetchProfilePicture = () => {
    axios
      .get("http://localhost:8080/api/v1/myuser/image", {
        responseType: "arraybuffer",
      })
      .then((res) => {
        let base64ImageString = Buffer.from(res.data, "binary").toString(
          "base64"
        );
        setPrintedImage(base64ImageString);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitUserNameHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/v1/profile/firstname", userData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitUserLastNameHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/profile/lastname", userData)
      .then((res) => {
        console.log(res.data);
        // window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitUserMobileHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/profile/mobile", userData)
      .then((res) => {
        console.log(res.data);
        // window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadImage = (files) => {
    setSelectedFile(files[0]);
  };
  const submitImageHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:8080/api/v1/profile", formData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProfilePicture();
    axios
      .get("http://localhost:8080/api/v1/user")
      .then((res) => {
        setSignedInUserInfo(res.data);
        setProfileImage(res.data.image);
      })
      .catch((err) => {
        console.log("No user Sigen in");
      });
  }, []);
  console.log(signedInUserInfo);
  console.log(userData);
  return (
    <div>
      <NavbarCom></NavbarCom>
      <Sidebar></Sidebar>
      <Robot></Robot>
      <div className="profile-container">
        <img
          className="side-image"
          src={`data:image/jpeg;base64,${printedImage}`}
          alt={signedInUserInfo.userName}
        />
        <p className="profile-field">First name :</p>
        <p className="profile-field-value"> {signedInUserInfo.userName}</p>{" "}
        <br />
        <p className="profile-field">Last name :</p>
        <p className="profile-field-value"> {signedInUserInfo.lastName}</p>{" "}
        <br />
        <p className="profile-field">phone : </p>
        <p className="profile-field-value"> {signedInUserInfo.mobile}</p> <br />
        <button
          className="profile-field-btn"
          onClick={() => isOnEditingMode(!onEditingMode)}
        >
          Edit profile
        </button>
      </div>
      <Modal
        show={onEditingMode}
        onHide={() => isOnEditingMode(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Body className="edit-container">
          <img
            className="main-image"
            src={`data:image/jpeg;base64,${printedImage}`}
            alt={signedInUserInfo.userName}
          />
          <Form className="edit-user-name">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Change your name"
                onChange={onChangeHandler}
                value={userName}
                name="userName"
              />
            </Form.Group>{" "}
            <BsCheckBox
              onClick={submitUserNameHandler}
              className="submit-user-info"
            >
              {" "}
            </BsCheckBox>
          </Form>
          <Form className="edit-last-name">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Change your Lastname"
                onChange={onChangeHandler}
                value={lastName}
                name="lastName"
              />
            </Form.Group>

            <BsCheckBox
              onClick={submitUserLastNameHandler}
              className="submit-user-info"
            >
              {" "}
            </BsCheckBox>
          </Form>
          <Form className="edit-mobile">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Change your phone number"
                onChange={onChangeHandler}
                value={mobile}
                name="mobile"
              />
            </Form.Group>

            <BsCheckBox
              onClick={submitUserMobileHandler}
              className="submit-user-info"
            >
              {" "}
            </BsCheckBox>
          </Form>

          <Form className="edit-user-name" onSubmit={submitImageHandler}>
            <Form.File.Input
              className="field-file-profile"
              name="image"
              type="file"
              onChange={(e) => uploadImage(e.target.files)}
              value={image}
            />
            <Button className="change-picture-btn" type="submit">
              Upload
            </Button>
          </Form>
          <button
            className="submit-my-user"
            onClick={() => window.location.reload(false)}
          >
            Submit
          </button>
        </Modal.Body>
      </Modal>
      {profileImage !== null && (
        <img
          className="profile-image"
          src={`data:image/jpeg;base64,${printedImage}`}
          alt={signedInUserInfo.userName}
        />
      )}
      {onEditingMode === true ? <div></div> : <div></div>}
    </div>
  );
}

export default MyProfile;

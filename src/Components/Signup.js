import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../contexts/UserAuthContext";
import styled from "styled-components";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { uid } from "uid";


const Button = styled.button`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 20px;
  width: 100%;

  &:hover {
    background-color: white;
    color: blue;
    border: 2px solid blue;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");
  const id = uid();
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password , name , value , id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box" style={{ width: "70%", margin: "100px auto" }}>
        <h2 className="mb-3">Create your account.</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formbBasicText">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <PhoneInput
            defaultCountry="PK"
            className="phoneInput"
            id="number"
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
          />

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
        <div className="p-4 box mt-3 text-center">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;

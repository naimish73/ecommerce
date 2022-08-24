import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./../../components/Signup";
import "./styles.scss";

const Registration = (props) => {
    const navigate = useNavigate();
    return <Signup navigate={navigate} />;
};

export default Registration;

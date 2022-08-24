import React from "react";
import "./styles.scss";
import SignIn from "../../components/SignIn";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    return <SignIn navigate={navigate} />;
};

export default Login;

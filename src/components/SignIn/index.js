import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import {
    signInUser,
    signInWithGoogle,
    resetAllAuthForms,
} from "../../redux/User/user.actions";

import AuthWrapper from "../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Buttons from "./../forms/Button";

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
    const navigate = useNavigate();
    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const resetForm = () => {
        setEmail("");
        setPassword("");
    };
    useEffect(() => {
        if (signInSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            navigate("/");
        }
    }, [signInSuccess, navigate, dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
    };

    const configAuthWrapper = {
        headline: "LogIn",
    };

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={(e) => setPassword(e.target.value)}
                    />
                    <Buttons type="submit">Login</Buttons>
                    <div className="socialSignin">
                        <div className="row">
                            <Buttons onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Buttons>
                        </div>
                    </div>
                    <div className="links">
                        <Link to="/recovery">Reset Password</Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default SignIn;

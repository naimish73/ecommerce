import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAuthForms, signUpUser } from "../../redux/User/user.actions";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { useNavigate } from "react-router-dom";

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError,
});
const Signup = (props) => {
    const navigate = useNavigate();
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (signUpSuccess) {
            reset();
            dispatch(resetAllAuthForms());
            navigate("/");
        }
    }, [signUpSuccess, navigate, dispatch]);

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError);
        }
    }, [signUpError]);
    const reset = () => {
        setDisplayName("");
        setEmail("");
        setPassowrd("");
        setConfirmPassword("");
        setErrors([]);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(
            signUpUser({
                displayName,
                email,
                password,
                confirmPassword,
            })
        );
    };

    const configAuthWrapper = {
        headline: "Registration",
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return <li key={index}>{err}</li>;
                        })}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={(e) => setDisplayName(e.target.value)}
                    />
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
                        handleChange={(e) => setPassowrd(e.target.value)}
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit">Register</Button>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default Signup;

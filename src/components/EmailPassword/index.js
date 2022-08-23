import React, { useState } from "react";
import "./styles.scss";
import { withRouter } from "../../withRouter";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";

import { auth } from "../../firebase/utils";

const EmailPassword = (props) => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                url: "http://localhost:3000/login",
            };
            await auth
                .sendPasswordResetEmail(email, config)
                .then(() => {
                    props.navigate("/login");
                })
                .catch((e) => {
                    console.log(e);
                    const err = ["Email not found, please try again"];
                    setErrors(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const configAuthWrapper = {
        headline: "Email Password",
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, index) => {
                            return <li key={index}>{e}</li>;
                        })}
                    </ul>
                )}
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit">Email Password</Button>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default withRouter(EmailPassword);

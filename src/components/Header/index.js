import React from "react";
import "./styles.scss";
import "../../default.scss";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
});
const Header = (props) => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>
                </div>
                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/dashboard">My Account</Link>
                            </li>
                            <li>
                                <span
                                    onClick={() => {
                                        signOut();
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    LOGOUT
                                </span>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">Register</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null,
};

export default Header;

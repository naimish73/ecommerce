import React from "react";
import "./styles.scss";
import "../../default.scss";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import { Link } from "react-router-dom";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selector";

import Logo from "../../assets/logo.png";

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumberCartItems: selectCartItemsCount(state),
});
const Header = (props) => {
    const { currentUser, totalNumberCartItems } = useSelector(mapState);
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

                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                    </ul>
                </nav>

                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="">
                                Your Cart ({totalNumberCartItems})
                            </Link>
                        </li>
                        {currentUser && [
                            <li>
                                <Link to="/dashboard">My Account</Link>
                            </li>,
                            <li>
                                <span
                                    onClick={() => {
                                        signOut();
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    LOGOUT
                                </span>
                            </li>,
                        ]}
                        {!currentUser && [
                            <li>
                                <Link to="/registration">Register</Link>
                            </li>,
                            <li>
                                <Link to="/login">Login</Link>
                            </li>,
                        ]}
                    </ul>
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null,
};

export default Header;

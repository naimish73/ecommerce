import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { withRouter } from "../withRouter";
import { Redirect, Route } from "react-router-dom";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
});

const useAuth = (props) => {
    const { currentUser } = useSelector(mapState);
    useEffect(() => {
        if (!currentUser) {
        }
    }, [currentUser]);
    return currentUser;
};

export default useAuth;

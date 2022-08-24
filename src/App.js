import React, { useEffect } from "react";
import { connect } from "react-redux/es/exports";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";

//hoc
import WithAuth from "./hoc/withAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";

const App = (props) => {
    const { setCurrentUser, currentUser } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const authListener = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot((snapshot) => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                });
            }
            setCurrentUser(userAuth);
        });
        return () => {
            authListener();
        };
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomepageLayout>
                            <HomePage />
                        </HomepageLayout>
                    }
                />
                <Route
                    path="/registration"
                    element={
                        <MainLayout>
                            <Registration />
                        </MainLayout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <MainLayout>
                            <Login />
                        </MainLayout>
                    }
                />
                <Route
                    path="/recovery"
                    element={
                        <MainLayout>
                            <Recovery />
                        </MainLayout>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <WithAuth navigate={navigate}>
                            <MainLayout>
                                <Dashboard />
                            </MainLayout>
                        </WithAuth>
                    }
                />
            </Routes>
        </div>
    );
};

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

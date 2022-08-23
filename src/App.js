import React, { Component } from "react";
import { connect } from "react-redux/es/exports";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";

class App extends Component {
    authListener = null;
    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.authListener = auth.onAuthStateChanged(async (userAuth) => {
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
    }
    componentWillUnmount() {
        this.authListener();
    }

    render() {
        const { currentUser } = this.props;
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
                                {currentUser ? <Navigate to="/" /> : null}
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <MainLayout>
                                <Login />
                                {currentUser ? <Navigate to="/" /> : null}
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
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

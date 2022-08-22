import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

const initialState = {
    currentUser: null,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
        };
    }
    authListener = null;
    componentDidMount() {
        this.authListener = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot((snapshot) => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        },
                    });
                });
            }
            this.setState({
                ...initialState,
            });
        });
    }
    componentWillUnmount() {
        this.authListener();
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomepageLayout currentUser={currentUser}>
                                <HomePage />
                            </HomepageLayout>
                        }
                    />
                    <Route
                        path="/registration"
                        element={
                            <MainLayout currentUser={currentUser}>
                                <Registration />
                                {currentUser ? <Navigate to="/" /> : null}
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <MainLayout currentUser={currentUser}>
                                <Login />
                                {currentUser ? <Navigate to="/" /> : null}
                            </MainLayout>
                        }
                    />
                </Routes>
            </div>
        );
    }
}

export default App;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const authListener = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot((snapshot) => {
                    dispatch(
                        setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data(),
                        })
                    );
                });
            }
            dispatch(setCurrentUser(userAuth));
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

export default App;

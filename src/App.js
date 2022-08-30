import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

//components
import AdminToolbar from "./components/AdminToolbar";

//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";

// pages
import HomePage from "./pages/Homepage";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

const App = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, []);

    return (
        <div className="App">
            <AdminToolbar />
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
                    path="/search"
                    element={
                        <MainLayout>
                            <Search />
                        </MainLayout>
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
                        <WithAuth>
                            <DashBoardLayout>
                                <Dashboard />
                            </DashBoardLayout>
                        </WithAuth>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <WithAdminAuth>
                            <AdminLayout>
                                <Admin />
                            </AdminLayout>
                        </WithAdminAuth>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import HomePage from "./pages/Homepage";
import Registration from "./pages/Registration";

function App() {
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
            </Routes>
        </div>
    );
}

export default App;

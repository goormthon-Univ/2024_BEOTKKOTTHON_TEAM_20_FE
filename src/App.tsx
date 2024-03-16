import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostBoardPage from "./pages/PostBoardPage";
import LoginPage from "./pages/LoginPage";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import LogoutPage from "./pages/LogoutPage";
import WritePage from "./pages/WritePage";
import ReadPage from "./pages/ReadPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/postBoard" Component={PostBoardPage} />
                <Route
                    path="/auth/redirected/kakao"
                    element={<OAuth2RedirectHandler />}
                />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/write" Component={WritePage}/>
                <Route path="/read" Component={ReadPage}/>
            </Routes>
        </Router>
    );
};

export default App;

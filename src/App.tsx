import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChattingPage from "@/pages/ChattingPage/ChattingPage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import MainPage from "@/pages/MainPage/MainPage";
import MatchPage from "@/pages/MatchPage/MatchPage";

import GlobalStyles from "@/styles/GlobalStyles.styles";

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/chatting/:id" element={<ChattingPage />} />
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

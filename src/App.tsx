import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/home-page";
import LoginPage from "./pages/login-page/login-page";
import RegisterPage from "./pages/register-page/register-page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

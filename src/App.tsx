import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import PrivateRoute from "./guards/private-route";
import PublicRoute from "./guards/public-route";
import DashboardPage from "./pages/dashboard-page/dashboard-page";
import HomePage from "./pages/home-page/home-page";
import LoadingPage from "./pages/loading-page/loading-page";
import LoginPage from "./pages/login-page/login-page";
import RegisterPage from "./pages/register-page/register-page";

const App: React.FC = () => {
  const auth = useAuth();

  return auth.isLoading ? (
    <LoadingPage />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute element={<HomePage />} />} />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute element={<RegisterPage />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

interface IPublicRoute {
  element: JSX.Element;
}

const PublicRoute: React.FC<IPublicRoute> = (props) => {
  const auth = useAuth();

  if (auth.currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return props.element;
};

export default PublicRoute;

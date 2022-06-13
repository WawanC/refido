import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

interface IPrivateRoute {
  element: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRoute> = (props) => {
  const auth = useAuth();

  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  return props.element;
};

export default PrivateRoute;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

interface IPrivateRoute {
  element: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRoute> = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, []);

  return props.element;
};

export default PrivateRoute;

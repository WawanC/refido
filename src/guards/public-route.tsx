import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

interface IPublicRoute {
  element: JSX.Element;
}

const PublicRoute: React.FC<IPublicRoute> = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, []);

  return props.element;
};

export default PublicRoute;

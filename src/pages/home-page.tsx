import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <h1>Refido Home Page</h1>
      <Link to="/register">Register</Link>
    </>
  );
};

export default HomePage;

import classes from "./home-page.module.css";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <main className={classes.main}>
      <section className={classes.mainBox}>
        <h1 className={classes.title}>Refido Home Page</h1>
        <div className={classes.linkBox}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

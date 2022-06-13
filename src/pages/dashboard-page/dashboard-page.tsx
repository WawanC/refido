import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useAuth } from "../../contexts/auth";
import { useUser } from "../../hooks/user";
import classes from "./dashboard-page.module.css";

const DashboardPage: React.FC = () => {
  const [user, userLoading] = useUser();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && !auth.currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <main className={classes.main}>
      <section className={classes.box}>
        {userLoading ? (
          <MoonLoader color="black" size={60} />
        ) : (
          <>
            <h1 className={classes.title}>
              Hello, {user?.username || "User"} !
            </h1>
            <div className={classes.actionsBox}>
              <button>Logout</button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;

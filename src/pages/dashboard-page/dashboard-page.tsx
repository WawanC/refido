import { MoonLoader } from "react-spinners";
import { useUser } from "../../hooks/user";
import classes from "./dashboard-page.module.css";

const DashboardPage: React.FC = () => {
  const [user, userLoading] = useUser();

  console.log("loading ", userLoading);

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
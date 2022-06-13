import { MoonLoader } from "react-spinners";
import { useLogoutUser, useUser } from "../../hooks/user";
import classes from "./dashboard-page.module.css";

const DashboardPage: React.FC = () => {
  const [user, userLoading] = useUser();
  const [logout, logoutLoading] = useLogoutUser();

  const logoutBtnHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={classes.main}>
      <section className={classes.box}>
        {userLoading || logoutLoading ? (
          <MoonLoader color="black" size={60} />
        ) : (
          <>
            <h1 className={classes.title}>
              Hello, {user?.username || "User"} !
            </h1>
            <div className={classes.actionsBox}>
              <button onClick={logoutBtnHandler}>Logout</button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;

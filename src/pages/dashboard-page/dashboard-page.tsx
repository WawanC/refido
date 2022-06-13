import classes from "./dashboard-page.module.css";

const DashboardPage: React.FC = () => {
  return (
    <main className={classes.main}>
      <section className={classes.box}>
        <h1 className={classes.title}>Hello, User !</h1>
        <div className={classes.actionsBox}>
          <button>Logout</button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;

import classes from "./login-page.module.css";

const LoginPage: React.FC = () => {
  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <h1 className={classes.formTitle}>Sign-In</h1>
        <div className={classes.inputBox}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" />
        </div>
        <div className={classes.inputBox}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={classes.actionBox}>
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;

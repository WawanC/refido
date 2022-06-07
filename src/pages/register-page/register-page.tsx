import classes from "./register-page.module.css";

const RegisterPage: React.FC = () => {
  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <h1 className={classes.formTitle}>Create Account</h1>
        <div className={classes.inputBox}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" />
        </div>
        <div className={classes.inputBox}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={classes.inputBox}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={classes.inputBox}>
          <label htmlFor="password2">Repeat Password</label>
          <input type="password" id="password2" />
        </div>
        <div className={classes.actionBox}>
          <button>Register</button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;

import React, { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useLoginUser } from "../../hooks/user";
import { handleAuthError } from "../../utils/errorHandler";
import classes from "./login-page.module.css";

enum LoginFormAction {
  CHANGE_EMAIL_USERNAME,
  CHANGE_PASSWORD,
  CLEAR_ALL,
}

interface ILoginFormState {
  enteredEmailOrUsername: string;
  enteredPassword: string;
}

interface ILoginFormAction {
  type: LoginFormAction;
  payload?: string;
}

const loginFormInitialState: ILoginFormState = {
  enteredEmailOrUsername: "",
  enteredPassword: "",
};

const formReducer: React.Reducer<ILoginFormState, ILoginFormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case LoginFormAction.CHANGE_EMAIL_USERNAME:
      return { ...state, enteredEmailOrUsername: action.payload?.trim() || "" };

    case LoginFormAction.CHANGE_PASSWORD:
      return { ...state, enteredPassword: action.payload?.trim() || "" };

    case LoginFormAction.CLEAR_ALL:
      return loginFormInitialState;

    default:
      return state;
  }
};

const LoginPage: React.FC = () => {
  const [formState, formDispatch] = useReducer<
    React.Reducer<ILoginFormState, ILoginFormAction>
  >(formReducer, loginFormInitialState);
  const [loginUser, loginUserLoading] = useLoginUser();
  const [error, setError] = useState<{ message: string; field: string } | null>(
    null
  );
  const navigate = useNavigate();

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setError(null);

    try {
      await loginUser({
        emailOrUsername: formState.enteredEmailOrUsername.trim(),
        password: formState.enteredPassword.trim(),
      });
    } catch (error: any) {
      console.log(error);
      const err = handleAuthError(error.code || error.message);
      if (!err) return;
      setError({ message: err.message, field: err.field });
      formDispatch({ type: LoginFormAction.CLEAR_ALL });
      return;
    }

    navigate("/dashboard");

    formDispatch({ type: LoginFormAction.CLEAR_ALL });
  };

  return (
    <main className={classes.main}>
      <form
        className={`${classes.form} ${loginUserLoading && classes.formLoading}`}
        onSubmit={submitFormHandler}
      >
        {loginUserLoading ? (
          <MoonLoader color="black" size={60} />
        ) : (
          <>
            <h1 className={classes.formTitle}>Sign-In</h1>
            {error && (
              <span className={classes.formError}>{error.message}</span>
            )}
            <div className={classes.inputBox}>
              <label htmlFor="emailOrUsername">E-Mail / Username</label>
              <input
                type="text"
                id="emailOrUsername"
                value={formState.enteredEmailOrUsername}
                onChange={(ev) =>
                  formDispatch({
                    type: LoginFormAction.CHANGE_EMAIL_USERNAME,
                    payload: ev.target.value,
                  })
                }
                required
              />
            </div>
            <div className={classes.inputBox}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formState.enteredPassword}
                onChange={(ev) =>
                  formDispatch({
                    type: LoginFormAction.CHANGE_PASSWORD,
                    payload: ev.target.value,
                  })
                }
                required
              />
            </div>
            <div className={classes.actionBox}>
              <button type="submit">Login</button>
            </div>
            <section className={classes.linkSection}>
              <p>Don't have an account yet ?</p>
              <Link to="/register">Register Here</Link>
            </section>
          </>
        )}
      </form>
    </main>
  );
};

export default LoginPage;

import React, { useReducer } from "react";
import classes from "./login-page.module.css";

enum LoginFormAction {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CLEAR_ALL,
}

interface ILoginFormState {
  enteredEmail: string;
  enteredPassword: string;
}

interface ILoginFormAction {
  type: LoginFormAction;
  payload?: string;
}

const loginFormInitialState: ILoginFormState = {
  enteredEmail: "",
  enteredPassword: "",
};

const formReducer: React.Reducer<ILoginFormState, ILoginFormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case LoginFormAction.CHANGE_EMAIL:
      return { ...state, enteredEmail: action.payload?.trim() || "" };

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

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    console.log(formState);

    formDispatch({ type: LoginFormAction.CLEAR_ALL });
  };

  return (
    <main className={classes.main}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h1 className={classes.formTitle}>Sign-In</h1>
        <div className={classes.inputBox}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.enteredEmail}
            onChange={(ev) =>
              formDispatch({
                type: LoginFormAction.CHANGE_EMAIL,
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
      </form>
    </main>
  );
};

export default LoginPage;

import React, { useReducer } from "react";
import classes from "./register-page.module.css";

interface IRegisterFormState {
  enteredEmail: string;
  enteredUsername: string;
  enteredPassword: string;
  enteredPassword2: string;
}

interface IRegisterFormAction {
  type: RegisterFormAction;
  payload?: string;
}

enum RegisterFormAction {
  CHANGE_EMAIL,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD2,
  CLEAR_ALL,
}

const formReducer: React.Reducer<IRegisterFormState, IRegisterFormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case RegisterFormAction.CHANGE_EMAIL:
      return { ...state, enteredEmail: action.payload || "" };
    case RegisterFormAction.CHANGE_USERNAME:
      return { ...state, enteredUsername: action.payload || "" };
    case RegisterFormAction.CHANGE_PASSWORD:
      return { ...state, enteredPassword: action.payload || "" };
    case RegisterFormAction.CHANGE_PASSWORD2:
      return { ...state, enteredPassword2: action.payload || "" };
    case RegisterFormAction.CLEAR_ALL:
      return registerFormInitialState;
    default:
      return state;
  }
};

const registerFormInitialState: IRegisterFormState = {
  enteredEmail: "",
  enteredUsername: "",
  enteredPassword: "",
  enteredPassword2: "",
};

const RegisterPage: React.FC = () => {
  const [formState, formDispatch] = useReducer<
    React.Reducer<IRegisterFormState, IRegisterFormAction>
  >(formReducer, registerFormInitialState);

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    console.log(formState);

    formDispatch({ type: RegisterFormAction.CLEAR_ALL });
  };

  return (
    <main className={classes.main}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h1 className={classes.formTitle}>Create Account</h1>
        <div className={classes.inputBox}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.enteredEmail}
            onChange={(ev) =>
              formDispatch({
                type: RegisterFormAction.CHANGE_EMAIL,
                payload: ev.target.value,
              })
            }
            required
          />
        </div>
        <div className={classes.inputBox}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formState.enteredUsername}
            onChange={(ev) =>
              formDispatch({
                type: RegisterFormAction.CHANGE_USERNAME,
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
                type: RegisterFormAction.CHANGE_PASSWORD,
                payload: ev.target.value,
              })
            }
            required
          />
        </div>
        <div className={classes.inputBox}>
          <label htmlFor="password2">Repeat Password</label>
          <input
            type="password"
            id="password2"
            value={formState.enteredPassword2}
            onChange={(ev) =>
              formDispatch({
                type: RegisterFormAction.CHANGE_PASSWORD2,
                payload: ev.target.value,
              })
            }
            required
          />
        </div>
        <div className={classes.actionBox}>
          <button type="submit">Register</button>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;

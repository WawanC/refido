import React, { useReducer, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useCreateUserData, useGetUserByUsername } from "../../hooks/database";
import { handleFirebaseError } from "../../utils/firebase-error";
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
  CLEAR_PASSWORDS,
  CLEAR_ALL,
}

const formReducer: React.Reducer<IRegisterFormState, IRegisterFormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case RegisterFormAction.CHANGE_EMAIL:
      return { ...state, enteredEmail: action.payload?.trim() || "" };
    case RegisterFormAction.CHANGE_USERNAME:
      return { ...state, enteredUsername: action.payload?.trim() || "" };
    case RegisterFormAction.CHANGE_PASSWORD:
      return { ...state, enteredPassword: action.payload?.trim() || "" };
    case RegisterFormAction.CHANGE_PASSWORD2:
      return { ...state, enteredPassword2: action.payload?.trim() || "" };
    case RegisterFormAction.CLEAR_PASSWORDS:
      return { ...state, enteredPassword: "", enteredPassword2: "" };
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
  const [error, setError] = useState<string | null>(null);
  const { registerUser } = useAuth();
  const [createUserData, createUserDataLoading] = useCreateUserData();
  const [getUserByUsername, getUserByUsernameLoading] = useGetUserByUsername();

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setError(null);

    if (formState.enteredUsername.length < 6) {
      setError("Username minimal 6 characters long");
      formDispatch({ type: RegisterFormAction.CHANGE_USERNAME });
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    if (formState.enteredUsername.length < 6) {
      setError("Username minimal 6 characters long");
      formDispatch({ type: RegisterFormAction.CHANGE_USERNAME });
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    if (formState.enteredPassword.length < 6) {
      setError("Passwords minimal 6 characters long");
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    if (formState.enteredPassword !== formState.enteredPassword2) {
      setError("Passwords not equal");
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    console.log(formState);

    try {
      const user = await getUserByUsername(formState.enteredUsername.trim());

      if (user.exists()) {
        throw new Error("auth/username-already-in-use");
      }

      const userData = await registerUser(
        formState.enteredEmail.trim(),
        formState.enteredPassword.trim()
      );

      await createUserData({
        uid: userData.user.uid,
        email: formState.enteredEmail.trim(),
        username: formState.enteredUsername.trim(),
      });
    } catch (error: any) {
      const message = handleFirebaseError(error.code || error.message);
      setError(message);
      return formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
    }

    formDispatch({ type: RegisterFormAction.CLEAR_ALL });
  };

  return (
    <main className={classes.main}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h1 className={classes.formTitle}>Create Account</h1>
        {error && <span className={classes.formError}>{error}</span>}
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

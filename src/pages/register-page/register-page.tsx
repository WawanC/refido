import React, { useReducer, useState } from "react";
import { useRegisterUser } from "../../hooks/user";
import { handleAuthError } from "../../utils/errorHandler";
import classes from "./register-page.module.css";
import { MoonLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

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
  const [error, setError] = useState<{ message: string; field: string } | null>(
    null
  );
  const [registerUser, registerUserLoading] = useRegisterUser();

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setError(null);

    if (formState.enteredUsername.length < 6) {
      setError({
        message: "Username minimal 6 characters long",
        field: "password",
      });
      formDispatch({ type: RegisterFormAction.CHANGE_USERNAME });
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    if (formState.enteredUsername.length < 6) {
      setError({
        message: "Username minimal 6 characters long",
        field: "username",
      });
      formDispatch({ type: RegisterFormAction.CHANGE_USERNAME });
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    if (formState.enteredPassword.length < 6) {
      setError({
        message: "Passwords minimal 6 characters long",
        field: "password",
      });
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    if (formState.enteredPassword !== formState.enteredPassword2) {
      setError({ message: "Passwords not equal", field: "password2" });
      formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
      return;
    }

    try {
      await registerUser({
        email: formState.enteredEmail.trim(),
        username: formState.enteredUsername.trim(),
        password: formState.enteredPassword.trim(),
      });
    } catch (error: any) {
      const err = handleAuthError(error.code || error.message);
      if (!err) return;

      setError({ message: err.message, field: err.field });

      return formDispatch({ type: RegisterFormAction.CLEAR_PASSWORDS });
    }

    alert("Register Success");

    formDispatch({ type: RegisterFormAction.CLEAR_ALL });
  };

  return (
    <main className={classes.main}>
      <form
        className={`${classes.form} ${
          registerUserLoading && classes.formLoading
        }`}
        onSubmit={submitFormHandler}
      >
        {registerUserLoading ? (
          <MoonLoader color="black" size={60} />
        ) : (
          <>
            <h1 className={classes.formTitle}>Create Account</h1>
            {error && (
              <span className={classes.formError}>{error.message}</span>
            )}
            <div
              className={`${classes.inputBox} ${
                error?.field === "email" && classes.inputError
              }`}
            >
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
            <div
              className={`${classes.inputBox} ${
                error?.field === "username" && classes.inputError
              }`}
            >
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
            <div
              className={`${classes.inputBox} ${
                error?.field === "password" && classes.inputError
              }`}
            >
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
            <div
              className={`${classes.inputBox} ${
                error?.field === "password2" && classes.inputError
              }`}
            >
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
            <section className={classes.linkSection}>
              <p>Already have an account ?</p>
              <Link to="/login">Login Here</Link>
            </section>
          </>
        )}
      </form>
    </main>
  );
};

export default RegisterPage;

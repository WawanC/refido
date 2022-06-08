import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import { useState } from "react";
import { auth, database } from "../utils/firebase";

export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerUser = async (userData: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const usersRef = ref(database, "users");

      const checkUserQuery = query(
        usersRef,
        orderByChild("username"),
        equalTo(userData.username)
      );
      const user = await get(checkUserQuery);

      if (user.exists()) {
        throw new Error("auth/username-already-in-use");
      }

      const newUser = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const newUserRef = ref(database, `users/${newUser.user.uid}`);

      await set(newUserRef, {
        email: userData.email,
        username: userData.username,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return [registerUser, isLoading] as const;
};

export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginUser = async (userData: {
    emailOrUsername: string;
    password: string;
  }) => {
    setIsLoading(true);
    let userEmail = userData.emailOrUsername;

    try {
      const isEmail = String(userEmail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

      if (!isEmail) {
        const usersRef = ref(database, "users");
        const getUserQuery = query(
          usersRef,
          orderByChild("username"),
          equalTo(userData.emailOrUsername)
        );

        const user = await get(getUserQuery);

        if (!user.exists()) {
          throw new Error("auth/user-not-found");
        }

        userEmail = user.val()[Object.keys(user.val())[0]].email;
      }

      await signInWithEmailAndPassword(auth, userEmail, userData.password);
    } catch (error: any) {
      throw error;
    }
  };

  return [loginUser, isLoading] as const;
};

import { createUserWithEmailAndPassword } from "firebase/auth";
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

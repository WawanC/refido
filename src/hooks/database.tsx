import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import { useState } from "react";
import { database } from "../utils/firebase";

export const useCreateUserData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createUserData = async (userData: {
    uid: string;
    email: string;
    username: string;
  }) => {
    setIsLoading(true);

    const usersRef = ref(database, `users/${userData.uid}`);

    try {
      await set(usersRef, {
        email: userData.email,
        username: userData.username,
      });
    } catch (error) {
      throw error;
    }

    setIsLoading(false);
  };

  return [createUserData, isLoading] as const;
};

export const useGetUserByUsername = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async (username: string) => {
    try {
      const userQuery = query(
        ref(database, "users"),
        orderByChild("username"),
        equalTo(username)
      );
      return await get(userQuery);
    } catch (error) {
      throw error;
    }
  };

  return [getUser, isLoading] as const;
};

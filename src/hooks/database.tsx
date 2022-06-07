import { ref, set } from "firebase/database";
import { useState } from "react";
import { database } from "../utils/firebase";

export const useCreateUserData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const createUserData = async (userData: {
    uid: string;
    email: string;
    username: string;
  }) => {
    setIsLoading(true);
    setError(null);

    const usersRef = ref(database, `users/${userData.uid}`);

    try {
      await set(usersRef, {
        email: userData.email,
        username: userData.username,
      });
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  return [createUserData, isLoading, error] as const;
};

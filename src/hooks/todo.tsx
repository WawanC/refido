import { push, ref } from "firebase/database";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { database } from "../utils/firebase";

export const useCreateTodo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentUser } = useAuth();

  const createTodo = async (todoData: { title: string }) => {
    setIsLoading(true);
    if (!currentUser) return;

    const userTodosRef = ref(database, `todos/${currentUser.uid}`);

    try {
      await push(userTodosRef, {
        title: todoData.title,
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }

    setIsLoading(false);
  };

  return [createTodo, isLoading] as const;
};

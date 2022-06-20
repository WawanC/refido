import { get, push, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import { database } from "../utils/firebase";

export interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
}

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
        isCompleted: false,
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }

    setIsLoading(false);
  };

  return [createTodo, isLoading] as const;
};

export const useGetTodos = () => {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      setError(null);

      const userTodosRef = ref(database, `todos/${currentUser.uid}`);

      try {
        const snapshot = await get(userTodosRef);
        const todos: ITodo[] = [];

        if (snapshot.exists()) {
          const todosData = snapshot.val();

          for (const key in todosData) {
            todos.push({
              id: key,
              title: todosData[key].title,
              isCompleted: todosData[key].isCompleted,
            });
          }

          setTodos(todos);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error);
      }

      setIsLoading(false);
    };
    fetchTodos();
  }, [currentUser]);

  return [todos, isLoading, error] as const;
};

export const useToggleTodo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();

  const toggleTodo = async (todoId: string, isCompleted: boolean) => {
    if (!currentUser) return;
    setIsLoading(true);

    const todoRef = ref(database, `/todos/${currentUser.uid}/${todoId}`);

    try {
      await update(todoRef, { isCompleted });
    } catch (error) {
      throw error;
    }

    setIsLoading(false);
  };

  return [toggleTodo, isLoading] as const;
};

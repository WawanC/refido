import {
  equalTo,
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  runTransaction,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import { database } from "../utils/firebase";

export interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
  order: number;
}

export const useCreateTodo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();

  const createTodo = async (todoData: { title: string }) => {
    setIsLoading(true);
    if (!currentUser) return;

    const userTodosRef = ref(database, `todos/${currentUser.uid}`);

    try {
      let todoOrder = 1;

      const todos = await get(userTodosRef);

      if (todos.exists()) {
        todoOrder = Object.keys(todos.val()).length + 1;
      }

      await push(userTodosRef, {
        title: todoData.title,
        isCompleted: false,
        order: todoOrder,
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
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const userTodosRef = ref(database, `todos/${currentUser.uid}`);

    const unsubscribe = onValue(
      userTodosRef,
      (snapshot) => {
        setIsLoading(true);
        setError(null);

        const todos: ITodo[] = [];

        if (snapshot.exists()) {
          const todosData = snapshot.val();

          for (const key in todosData) {
            todos.push({
              id: key,
              title: todosData[key].title,
              isCompleted: todosData[key].isCompleted,
              order: todosData[key].order,
            });
          }

          const sortedTodo = todos.sort((a, b) => a.order - b.order);

          setTodos(sortedTodo);
        } else {
          setTodos([]);
        }

        setIsLoading(false);
      },
      (error) => setError(error)
    );

    return unsubscribe;
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

export const useDeleteTodo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();

  const deleteTodo = async (todoId: string) => {
    if (!currentUser) return;
    setIsLoading(true);

    const todoRef = ref(database, `/todos/${currentUser.uid}/${todoId}/`);

    try {
      await remove(todoRef);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }

    setIsLoading(false);
  };

  return [deleteTodo, isLoading] as const;
};

export const useOrderTodo = () => {
  const { currentUser } = useAuth();

  const reorderTodo = async (startOrder: number, targetOrder: number) => {
    if (!currentUser) return;

    const userTodosRef = ref(database, `todos/${currentUser.uid}`);

    try {
      const todo = await get(
        query(userTodosRef, orderByChild("order"), equalTo(startOrder))
      );
      if (!todo.exists) return;

      const todoKey = Object.keys(todo.val())[0];

      await runTransaction(userTodosRef, (todos) => {
        for (const key in todos) {
          if (
            todos[key].order >= targetOrder &&
            todos[key].order < todos[todoKey].order
          ) {
            todos[key].order++;
          }
        }
        todos[todoKey].order = targetOrder;

        return todos;
      });
    } catch (error) {
      throw error;
    }
  };

  return [reorderTodo] as const;
};

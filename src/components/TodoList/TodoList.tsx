import classes from "./TodoList.module.css";
import TodoItem from "../TodoItem/TodoItem";
import { ITodo } from "../../hooks/todo";

interface ITodoList {
  todos: ITodo[];
}

const TodoList: React.FC<ITodoList> = (props) => {
  return (
    <main className={classes.box}>
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isCompleted={todo.isCompleted}
        />
      ))}
    </main>
  );
};

export default TodoList;

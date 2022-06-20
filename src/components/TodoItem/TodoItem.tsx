import { useToggleTodo } from "../../hooks/todo";
import classes from "./TodoItem.module.css";

interface ITodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const [toggleTodo] = useToggleTodo();

  const toggleTodoHandler = async () => {
    try {
      await toggleTodo(props.id, !props.isCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.box} onClick={toggleTodoHandler}>
      <h1>{props.title}</h1>
      <span>({props.isCompleted ? "true" : "false"})</span>
    </div>
  );
};

export default TodoItem;

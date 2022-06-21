import { useDeleteTodo, useToggleTodo } from "../../hooks/todo";
import DraggableIcon from "../icons/DraggableIcon";
import classes from "./TodoItem.module.css";

interface ITodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const [toggleTodo] = useToggleTodo();
  const [deleteTodo] = useDeleteTodo();

  const toggleTodoHandler = async () => {
    try {
      await toggleTodo(props.id, !props.isCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();

    try {
      await deleteTodo(props.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.box}>
      <div className={classes.infoBox}>
        <DraggableIcon size={36} class={classes.draggableIcon} />
        <h1
          className={`${classes.title} ${
            props.isCompleted ? classes.done : ""
          }`}
          onClick={toggleTodoHandler}
        >
          {props.title}
        </h1>
      </div>
      <div className={classes.actionsBox}>
        <button onClick={deleteTodoHandler}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;

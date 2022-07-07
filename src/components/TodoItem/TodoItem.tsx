import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { useDeleteTodo, useToggleTodo } from "../../hooks/todo";
import DraggableIcon from "../icons/DraggableIcon";
import classes from "./TodoItem.module.css";
import React from "react";

interface ITodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const TodoItem = React.forwardRef<HTMLDivElement, ITodoItem>((props, ref) => {
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
    <div className={classes.box} ref={ref} {...props.draggableProps}>
      <div className={classes.infoBox}>
        <div {...props.dragHandleProps}>
          <DraggableIcon size={36} class={classes.draggableIcon} />
        </div>
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
});

export default TodoItem;

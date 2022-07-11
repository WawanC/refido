import classes from "./TodoList.module.css";
import TodoItem from "../TodoItem/TodoItem";
import { ITodo, useOrderTodo } from "../../hooks/todo";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";

interface ITodoList {
  todos: ITodo[];
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TodoList: React.FC<ITodoList> = (props) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [reorderTodos] = useOrderTodo();

  useEffect(() => {
    setTodos([...props.todos]);
  }, [props.todos]);

  const dragEndHandler = async (result: DropResult) => {
    if (!result.destination) return;

    const orderedTodos: ITodo[] = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    orderedTodos.forEach((todo, idx) => {
      todo.order = idx + 1;
    });

    try {
      await reorderTodos(orderedTodos);
    } catch (error) {
      console.log(error);
    }

    setTodos(orderedTodos);
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Droppable droppableId="todos">
        {(provided) => (
          <main
            className={classes.box}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.length > 0 ? (
              todos.map((todo, idx) => (
                <Draggable key={todo.id} draggableId={todo.id} index={idx}>
                  {(provided, snapshot) => (
                    <TodoItem
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      id={todo.id}
                      title={todo.title}
                      isCompleted={todo.isCompleted}
                      ref={provided.innerRef}
                    />
                  )}
                </Draggable>
              ))
            ) : (
              <p>No todos yet...</p>
            )}
            {provided.placeholder}
          </main>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;

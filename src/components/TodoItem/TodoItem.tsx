import classes from "./TodoItem.module.css";

interface ITodoItem {
  title: string;
  isCompleted: boolean;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  return (
    <div className={classes.box}>
      <h1>{props.title}</h1>
      <span>({props.isCompleted ? "true" : "false"})</span>
    </div>
  );
};

export default TodoItem;

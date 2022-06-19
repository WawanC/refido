import classes from "./NewTodoModal.module.css";

interface INewTodoModal {
  onClose: () => void;
}

const NewTodoModal: React.FC<INewTodoModal> = (props) => {
  return (
    <main className={classes.main}>
      <div className={classes.backdrop} onClick={props.onClose} />
      <form className={classes.box}>
        <h1 className={classes.title}>Create New Todo</h1>
        <div className={classes.inputBox}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Todo Title" />
        </div>
        <div className={classes.actionsBox}>
          <button type="submit">Add Todo</button>
        </div>
      </form>
    </main>
  );
};

export default NewTodoModal;

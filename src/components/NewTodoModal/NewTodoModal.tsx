import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { useCreateTodo } from "../../hooks/todo";
import classes from "./NewTodoModal.module.css";

interface INewTodoModal {
  onClose: () => void;
}

const NewTodoModal: React.FC<INewTodoModal> = (props) => {
  const [createTodo, createTodoLoading] = useCreateTodo();
  const [enteredTitle, setEnteredTitle] = useState<string>("");

  const changeEnteredTitleHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setEnteredTitle(event.target.value);
  };

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await createTodo({ title: enteredTitle.trim() });
    } catch (error) {
      console.log(error);
    }

    setEnteredTitle("");
    props.onClose();
  };

  return (
    <main className={classes.main}>
      <div className={classes.backdrop} onClick={props.onClose} />
      <form className={classes.box} onSubmit={submitFormHandler}>
        {createTodoLoading ? (
          <MoonLoader color="black" size={60} />
        ) : (
          <>
            <h1 className={classes.title}>Create New Todo</h1>
            <div className={classes.inputBox}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Todo Title"
                value={enteredTitle}
                onChange={changeEnteredTitleHandler}
                required
              />
            </div>
            <div className={classes.actionsBox}>
              <button type="submit">Add Todo</button>
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default NewTodoModal;

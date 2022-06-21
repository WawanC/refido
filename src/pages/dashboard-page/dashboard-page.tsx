import { useState } from "react";
import { MoonLoader } from "react-spinners";
import NewTodoModal from "../../components/NewTodoModal/NewTodoModal";
import TodoList from "../../components/TodoList/TodoList";
import { useGetTodos } from "../../hooks/todo";
import { useLogoutUser, useUser } from "../../hooks/user";
import classes from "./dashboard-page.module.css";

const DashboardPage: React.FC = () => {
  const [user, userLoading] = useUser();
  const [logout, logoutLoading] = useLogoutUser();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [todos] = useGetTodos();

  const logoutBtnHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleNewTodoModal = (value: boolean) => {
    setModalOpen(value);
  };

  const isLoading = userLoading || logoutLoading;

  return (
    <>
      {modalOpen && <NewTodoModal onClose={() => toggleNewTodoModal(false)} />}
      <main className={classes.main}>
        <section
          className={`${classes.box} ${isLoading && classes.box_loading}`}
        >
          {isLoading ? (
            <MoonLoader color="black" size={60} />
          ) : (
            <>
              <h1 className={classes.title}>
                Hello, {user?.username || "User"} !
              </h1>
              <div className={classes.actionsBox}>
                <button onClick={() => toggleNewTodoModal(true)}>
                  New Todo
                </button>
                <button onClick={logoutBtnHandler}>Logout</button>
              </div>
              <section>
                <TodoList todos={todos} />
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default DashboardPage;

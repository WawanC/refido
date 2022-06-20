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
  const [todos, todosLoading, todosError] = useGetTodos();

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

  return (
    <main className={classes.main}>
      {modalOpen && <NewTodoModal onClose={() => toggleNewTodoModal(false)} />}
      <section className={classes.box}>
        {userLoading || logoutLoading ? (
          <MoonLoader color="black" size={60} />
        ) : (
          <>
            <h1 className={classes.title}>
              Hello, {user?.username || "User"} !
            </h1>
            <div className={classes.actionsBox}>
              <button onClick={() => toggleNewTodoModal(true)}>New Todo</button>
              <button onClick={logoutBtnHandler}>Logout</button>
            </div>
            <section>{todos && <TodoList todos={todos} />}</section>
          </>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;

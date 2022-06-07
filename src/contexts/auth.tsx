import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

interface IAuthContext {
  currentUser: User | null;
  registerUser: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  registerUser: () => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const registerUser = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const value: IAuthContext = {
    currentUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;

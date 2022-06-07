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
  UserCredential,
} from "firebase/auth";
import { auth } from "../utils/firebase";

interface IAuthContext {
  currentUser: User | null;
  registerUser: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Auth Context not defined");
  }
  return context;
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
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return user;
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

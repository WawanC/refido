import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

interface IAuthContext {
  currentUser: User | null;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: IAuthContext = {
    currentUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;

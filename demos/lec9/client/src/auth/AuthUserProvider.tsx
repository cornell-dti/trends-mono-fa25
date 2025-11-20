import { User } from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../firebase";

type AuthData = {
  user: User | null;
  loading: boolean;
};

const AuthUserContext = createContext<AuthData>({ user: null, loading: true });

export default function AuthUserProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [authState, setAuthState] = useState<AuthData>({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setAuthState({ user: userAuth, loading: false });
    });
    return unsubscribe;
  }, []);

  return (
    <AuthUserContext.Provider value={authState}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthUserProvider");
  }
  return context;
};

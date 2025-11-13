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
  user?: User | null;
};

const AuthUserContext = createContext<AuthData>({ user: null });

export default function AuthUserProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [user, setUser] = useState<AuthData>({ user: null });
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      // What should happen when the auth changes?
      if (userAuth) {
        setUser({ user: userAuth });
      } else {
        setUser({ user: null });
      }
    });
  }, []);

  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthUserProvider");
  }
  return context;
};

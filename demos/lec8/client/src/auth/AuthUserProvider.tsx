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

export default function AuthUserProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      // What should happen when the auth changes?
    });
  }, []);

  return <></>;
}

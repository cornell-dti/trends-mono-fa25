import { useState } from "react";
import { signIn, signOut } from "../auth/auth";
import { useAuth } from "../auth/AuthUserProvider";

const Header = () => {
  /*
   * Add functionality to this component. The button should attempt to log you in or sign out
   * if logged in. You should also display a little welcome message next to the button
   * if the user is signed in, such as "Hello, Jane Doe!".
   *
   * Tips:
   * 1. The imports above are all that you need.
   * 2. You want to manage when a user is logged in...maybe a state?
   * 3. The `useAuth` hook will give you back a user, which has a displayName property.
   */

  const handleLoginClick = async () => {
    // TODO
  };

  return (
    <div
      style={{
        width: "90vw",
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
      }}
    >
      <button onClick={handleLoginClick}>TODO!</button>
    </div>
  );
};

export default Header;

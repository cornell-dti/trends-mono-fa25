import { signIn, signOut } from "../auth/auth";
import { useAuth } from "../auth/AuthUserProvider";

const Header = () => {
  const { user, loading } = useAuth();

  const handleLoginClick = async () => {
    if (user) {
      await signOut();
    } else {
      await signIn();
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "70vw",
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px"
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "70vw",
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px"
      }}
    >
      {user && <p>Hello, {user.displayName}</p>}
      <button onClick={handleLoginClick}>
        {user ? "Sign Out" : "Log In"}
      </button>
    </div>
  );
};

export default Header;

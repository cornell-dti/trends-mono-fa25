import "./App.css";
import AuthUserProvider from "./auth/AuthUserProvider";
import CoursePlan from "./components/CoursePlan";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <AuthUserProvider>
        <Header />
        <h1>CoursePlan Clone</h1>
        <CoursePlan />
      </AuthUserProvider>
    </div>
  );
};

export default App;

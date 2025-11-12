import "./App.css";
import CoursePlan from "./components/CoursePlan";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <h1>CoursePlan Clone</h1>
      <CoursePlan />
    </div>
  );
};

export default App;

import "./App.css";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import Filterbar from "./components/Filterbar";
import TaskList from "./components/TaskList";
function App() {
  return (
    <div>
      <TaskProvider>
        <Navbar />
        <Filterbar />
        <TaskList />
      </TaskProvider>
    </div>
  );
}

export default App;

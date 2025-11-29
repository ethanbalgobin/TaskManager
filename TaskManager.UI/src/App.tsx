import { useEffect } from "react";
import { TasksApi } from "./api/tasksApi";

function App() {
  useEffect(() => {
    TasksApi.getPaged(1, 10)
      .then((data) => console.log("API OK:", data))
      .catch((err) => console.error("API ERROR: ", err));
  }, []);

  return <h1>Task Manager UI</h1>;
}

export default App;

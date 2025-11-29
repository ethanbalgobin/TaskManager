import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";

import TaskList from "../pages/Tasks/TaskList";
import TaskCreate from "../pages/Tasks/TaskCreate";
import TaskEdit from "../pages/Tasks/TaskEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <TaskList /> },
      { path: "/tasks", element: <TaskList /> },
      { path: "/tasks/create", element: <TaskCreate /> },
      { path: "tasks/:id/edit", element: <TaskEdit /> },
    ],
  },
]);

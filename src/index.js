import {
  getTasks,
  deleteTask,
  getTask,
  updateTask,
  createTask,
  getSummary,
  getReport
} from "./dataActions";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  defer,
  json
} from "react-router-dom";
import App from "./components/routes/App";
import Summary from "./components/routes/Summary";
import TaskList from "./components/routes/TaskList";
import Task from "./components/routes/Task";
import Report from "./components/routes/Report";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    children: [
      {
        element: <Summary />,
        index: true,
        loader: async function ({ params }) {
          const summary = await getSummary();
          const topTasks = getTasks("top");
          return defer({
            summary: summary,
            tasks: topTasks
          });
        }
      },
      {
        path: "/tasks",
        element: <TaskList />,
        loader: async function ({ request }) {
          const url = new URL(request.url);
          const setting = url.searchParams.get("setting");
          const search = url.searchParams.get("search");
          const sort = url.searchParams.get("sort");
          const filters = [];
          url.searchParams.forEach((value, key) => {
            if (key !== "setting" && key !== "search" && key !== "sort") {
              filters.push({ type: key, value });
            }
          });
          return await getTasks(setting, search, filters, sort);
        }
      },
      {
        path: "/report",
        element: <Report />,
        loader: async function ({ request }) {
          const url = new URL(request.url);
          const setting = {
            month: url.searchParams.get("month") ?? new Date().getMonth() + 1,
            year: url.searchParams.get("year") ?? new Date().getFullYear()
          };
          console.log(setting);
          return await getReport(setting);
        }
      },
      {
        path: "/tasks/:id",
        element: <Task />,
        loader: async function ({ params }) {
          const task = getTask(params.id);
          const relatedTasks = await getTasks("related");
          return defer({
            task,
            relatedTasks
          });
        },
        action: async function ({ request, params }) {
          const formData = await request.formData();
          const task = JSON.parse(Object.fromEntries(formData).task);
          await updateTask(params.id, task);
          return json({ success: true, action: "task-edit" });
        }
      },
      {
        path: "/tasks/:id/destroy",
        action: async function ({ request, params }) {
          await deleteTask(params.id);
          return json({
            success: true,
            action: "task-delete",
            redirect: "/tasks"
          });
        }
      },
      {
        path: "/tasks/new",
        element: <Task />,
        action: async function ({ request, params }) {
          const formData = await request.formData();
          const taskData = JSON.parse(Object.fromEntries(formData).task);
          const task = await createTask(taskData);
          return json({
            success: true,
            action: "task-new",
            redirect: `/tasks/${task.id}`
          });
        }
      }
    ]
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

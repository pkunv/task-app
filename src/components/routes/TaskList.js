import Grid from "@mui/material/Grid";

import TaskCard from "../modules/TaskCard";
import TaskFilters from "../modules/TaskFilters";
import { useOutletContext, useLoaderData, Outlet } from "react-router-dom";

export default function TaskList() {
  const context = useOutletContext();
  const tasks = useLoaderData();
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 4, md: 12, xl: 24 }}
    >
      <TaskFilters />
      {tasks.map((task) => (
        <TaskCard task={task} />
      ))}
      <Grid item xs={6}>
        <TaskCard newCard={true} />
      </Grid>
      <Outlet context={context} />
    </Grid>
  );
}

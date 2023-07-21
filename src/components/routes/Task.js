import { useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Await } from "react-router-dom";

import TaskForm from "../../components/modules/TaskForm";
import { StyledProgress } from "../../components/modules/StyledProgress";
import TaskSkeleton from "../../components/modules/TaskSkeleton";

export default function Task() {
  const data = useLoaderData();
  const editing = data !== undefined;

  return editing ? (
    <Suspense
      fallback={
        <>
          <StyledProgress />
          <TaskSkeleton />
        </>
      }
    >
      <Await resolve={data.task}>
        <TaskForm />
      </Await>
    </Suspense>
  ) : (
    <TaskForm />
  );
}

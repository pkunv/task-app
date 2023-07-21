import { useNavigate, useLoaderData } from "react-router-dom";

import { Suspense } from "react";
import { Await } from "react-router-dom";
import SummarySkeleton from "../../components/modules/SummarySkeleton";
import ReportFilters from "../../components/modules/ReportFilters";
import { DataGrid } from "@mui/x-data-grid";

const getHHMMSS = (params) => {
  return new Date(params.row.time * 1000).toISOString().slice(11, 19);
};

const columns = [
  { field: "taskName", headerName: "Task name", flex: 1 },
  { field: "dt", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", valueGetter: getHHMMSS }
];

export default function Report() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/tasks/${params.row.taskID}/`);
  };

  return (
    <>
      <Suspense fallback={<SummarySkeleton />}>
        <Await resolve={data}>
          {(data) => (
            <>
              <ReportFilters />
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  onRowClick={handleRowClick}
                  rows={data}
                  columns={columns}
                  sx={{
                    // disable cell selection style
                    ".MuiDataGrid-cell:focus": {
                      outline: "none"
                    },
                    // pointer cursor on ALL rows
                    "& .MuiDataGrid-row:hover": {
                      cursor: "pointer"
                    }
                  }}
                />
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}

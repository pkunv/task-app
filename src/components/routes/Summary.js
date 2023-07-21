import { useLoaderData } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import SummarySkeleton from "../../components/modules/SummarySkeleton";
import Typography from "@mui/material/Typography";

import TaskCard from "../modules/TaskCard";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      yAlign: "bottom",
      padding: 4,
      bodySpacing: 1
    }
  },
  scales: { x: { grid: { display: false } }, y: { display: false } }
};

export default function Task() {
  const data = useLoaderData();
  const theme = useTheme();
  return (
    <>
      <Suspense fallback={<SummarySkeleton />}>
        <Await resolve={data.summary}>
          {(data) => (
            <Grid container spacing={1} direction="row">
              <Grid item xs={12}>
                <Typography variant="h4">Weekly summary</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline"
                  }}
                >
                  <Typography variant="h5">
                    {data["hours"].amount.toFixed(1)} hour
                    {data["hours"].amount > 1 ? "s" : ""}
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      width: "80%",
                      height: "15vh",
                      p: 1
                    }}
                  >
                    <Bar
                      options={options}
                      data={{
                        labels: [
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                          "Sun"
                        ],
                        datasets: [
                          {
                            label: "Hours",
                            backgroundColor: theme.palette.primary.main,
                            data: data["hours"].arr
                          }
                        ]
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline"
                  }}
                >
                  <Typography variant="h5">
                    {data["entries"].amount} entries
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      width: "80%",
                      height: "15vh",
                      p: 1
                    }}
                  >
                    <Bar
                      options={options}
                      data={{
                        labels: [
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                          "Sun"
                        ],
                        datasets: [
                          {
                            label: "Entries",
                            backgroundColor: theme.palette.primary.main,
                            data: data["entries"].arr
                          }
                        ]
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading</p>}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 4, md: 12, xl: 24 }}
          direction="row"
          justifyContent="center"
          mt={2}
        >
          <Grid item xs={12} xl={24} mt={2}>
            <Typography variant="h4">Top tasks</Typography>
          </Grid>
          <Await resolve={data.tasks}>
            {(tasks) =>
              tasks.map((task, index) => <TaskCard task={task} key={index} />)
            }
          </Await>
        </Grid>
      </Suspense>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Grid item xs={12} mt={2}>
          <Typography variant="h4">About</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body">
            This is a simple task app for managing your daily activities.
            Created using React, React Router and MUI libraries.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Author
              </Typography>
              <Typography variant="h5" component="div">
                Piotr Kuncy
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Junior Front-end dev
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Website</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

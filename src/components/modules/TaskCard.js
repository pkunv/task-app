import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { StyledLink, ZindexLink } from "../modules/StyledLink";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

import { useOutletContext } from "react-router-dom";

const StyledTaskCard = styled(Card)`
  /* console.log(theme) || for exposing theme obj to console */
  ${({ theme }) => `

  position: relative;
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.short
  })};
  &:hover {
    background-color: ${theme.palette.grey[100]};
    transform: scale(1.005);
  }
  `}
`;

const BgHoverCard = styled(Card)`
  /* console.log(theme) || for exposing theme obj to console */
  ${({ theme }) => `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.short
  })};
  &:hover {
    background-color: ${theme.palette.grey[100]};
    transform: scale(1.05);
  }
  `}
`;

const renderHoursFromSec = (task) => {
  return (
    task.entries
      .map((el) => {
        return el.time;
      })
      .reduce((partialSum, a) => partialSum + a, 0) / 3600
  ).toFixed(1);
};

export default function TaskCard({ task, newCard }) {
  const { submitDeleteTask, taskFetcher } = useOutletContext();

  return !newCard ? (
    <Grid item xs={6} key={task.id}>
      <StyledTaskCard
        sx={{ border: task.important ? 1 : 0, borderColor: "error.main" }}
      >
        <ZindexLink to={"/tasks/" + task.id + "/"} />
        <Box sx={{ display: "flex", ml: 1 }}>
          <Checkbox
            checked={task.done}
            name={task.id}
            onChange={(e) => {
              taskFetcher(task.id, { done: !task.done });
            }}
          />
          <CardHeader sx={{ pl: 1 }} title={task.name} />
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {task.realizationOpt === "singleDay"
              ? task.singleDtOpt.toLocaleDateString()
              : "From " +
                task.fromDtOpt.toLocaleDateString() +
                " to " +
                task.toDtOpt.toLocaleDateString()}
            {", " + renderHoursFromSec(task) + " hours"}
          </Typography>
        </CardContent>
        <CardActions>
          <Checkbox
            icon={<PushPinOutlinedIcon />}
            checkedIcon={<PushPinIcon />}
            checked={task.important}
            name={task.id}
            onChange={(e) => {
              taskFetcher(task.id, { important: !task.important });
            }}
          />

          <Button
            size="small"
            color="error"
            onClick={(e) => {
              e.preventDefault();
              submitDeleteTask(task.id);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </StyledTaskCard>
    </Grid>
  ) : (
    <StyledLink to={"/tasks/new"}>
      <Button type="submit" sx={{ width: "100%" }}>
        <BgHoverCard>
          <Typography mt={{ xs: 2, md: 6, xl: 6 }}>
            <AddIcon fontSize="large" />
          </Typography>
          <Typography variant="body" mb={{ xs: 2, md: 6, xl: 6 }}>
            Create new task
          </Typography>
        </BgHoverCard>
      </Button>
    </StyledLink>
  );
}

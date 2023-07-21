import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { StyledLink, ZindexLink } from "../modules/StyledLink";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Form } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchIcon from "@mui/icons-material/Search";

export default function TaskFilters() {
  return (
    <Grid item xs={12} md={12}>
      <Form
        style={{ width: "100%", margin: "0 auto" }}
        role="button"
        method="get"
      >
        <Card sx={{ display: "flex" }}>
          <Grid container spacing={2} p={1}>
            <Grid item xs={12} md={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="search">Search tasks</InputLabel>
                <Input
                  id="search"
                  name="search"
                  type="search"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl size="small" fullWidth>
                <InputLabel id="sort">Sort by</InputLabel>
                <Select
                  labelId="sort"
                  id="sort"
                  label="Sort by.."
                  name="sort"
                  defaultValue=""
                >
                  <MenuItem value={"important-1"} dense>
                    Most important
                  </MenuItem>
                  <MenuItem value={"important-0"} dense>
                    Least important
                  </MenuItem>
                  <MenuItem value={"hours-1"} dense>
                    Most hours
                  </MenuItem>
                  <MenuItem value={"hours-0"} dense>
                    Least hours
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl size="small" fullWidth>
                <InputLabel id="taskrealization">
                  Task realization type
                </InputLabel>
                <Select
                  labelId="taskrealization"
                  id="taskrealization"
                  label="Task realization type"
                  name="taskrealization"
                  defaultValue=""
                >
                  <MenuItem value={"singleDay"} dense>
                    Single day
                  </MenuItem>
                  <MenuItem value={"fromTo"} dense>
                    From / to
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox name="undone" />}
                label="Only undone"
              />
              <Button type="submit">Apply</Button>
            </Grid>
          </Grid>
        </Card>
      </Form>
    </Grid>
  );
}

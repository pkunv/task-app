import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray
} from "react-hook-form";
import { useSubmit, useOutletContext } from "react-router-dom";

export default function ReportFilters() {
  const {
    control,

    handleSubmit
  } = useForm({
    mode: "onChange"
  });
  let submit = useSubmit();
  const submitForm = (data) => {
    const jsonData = new FormData();

    jsonData.append("month", data.ym.month() + 1);
    jsonData.append("year", data.ym.year());
    submit(jsonData, { method: "get" });
  };

  return (
    <Grid item xs={12} md={12}>
      <form
        style={{ width: "100%", margin: "0 auto" }}
        onSubmit={handleSubmit(submitForm)}
      >
        <Card sx={{ display: "flex" }}>
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            spacing={2}
            p={1}
          >
            <Grid item xs={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="ym"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Date"
                      inputFormat="YYYY-MM"
                      views={["month", "year"]}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={6}>
              <Button type="submit">Apply</Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Grid>
  );
}

import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers";

export const initialEntry = { time: 0, comment: "", dt: new Date() };

const parseToHHMM = (sec) => {
  return new Date(parseInt(sec, 0) * 1000).toISOString().substr(11, 5);
};

const parseToDate = (hhmm) => {
  return (
    new Date(
      "1970-01-01T" + (hhmm === "" ? "00:00" : hhmm) + ":00Z"
    ).getTime() / 1000
  );
};

export function Entry({ index }) {
  var objName = "entries." + index;
  const {
    append,
    control,
    remove,
    update,
    setValue,
    formState: { errors }
  } = useFormContext();

  const submit = () => {
    remove(index);
  };

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name={objName + ".dt"}
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required."
              }
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                className="desktopDatePicker"
                label="Entry date"
                inputFormat="YYYY-MM-DD"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: "100%" }}
                    size="small"
                    helperText={errors?.entries?.at(index)?.dt?.message}
                    variant="outlined"
                    error={errors?.entries?.at(index)?.dt}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid container item xs={12} sm={6} alignItems="center">
        <Grid item xs={8}>
          <Controller
            name={objName + ".time"}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="time"
                label="Time"
                type="time"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                name={objName + ".time"}
                value={parseToHHMM(field.value)}
                onChange={(e) => {
                  setValue(objName + ".time", parseToDate(e.target.value));
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />
        </Grid>
        <Grid container item xs={4} justifyContent="center">
          <Button onClick={submit} size="small" color="error">
            Delete
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

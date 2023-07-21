import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

import { useAsyncValue, Form } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import { initialEntry, Entry } from "../../components/modules/Entry";

import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray
} from "react-hook-form";

import { useSubmit, useOutletContext } from "react-router-dom";

const initialFormState = {
  id: null,
  name: "",
  realizationOpt: "singleDay",
  singleDtOpt: new Date(),
  fromDtOpt: "",
  toDtOpt: "",
  important: false,
  creationDt: "",
  done: false,
  time: null,
  entries: []
};

let renderCount = 0;

export default function TaskForm() {
  const { submitDeleteTask } = useOutletContext();
  const task = useAsyncValue();
  let submit = useSubmit();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormState
  });
  const { append, update, remove } = useFieldArray({
    control,
    name: "entries"
  });

  const realizationOpt = watch("realizationOpt");
  const entries = watch("entries");
  const editing = task !== undefined;
  renderCount++;
  useEffect(() => {
    if (editing) reset({ ...task });
  }, [reset]);

  const submitForm = (data) => {
    const jsonData = new FormData();
    jsonData.append("task", JSON.stringify(data));
    submit(jsonData, { method: "post" });
  };

  return (
    <FormProvider
      {...{
        control,
        setValue,
        watch,
        reset,
        append,
        remove,
        update,
        formState: { errors }
      }}
    >
      <small>Render count: {renderCount}</small>
      <form onSubmit={handleSubmit(submitForm)}>
        <Card sx={{ display: "flex", p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} mb={2}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "This field is required."
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    placeholder="Task name..."
                    inputProps={{ style: { fontSize: 36 } }} // font size of input text
                    fullWidth
                    helpertext={errors?.name?.message}
                    error={errors?.name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="realizationOpt">Realization option</InputLabel>
                <Controller
                  name="realizationOpt"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required."
                    }
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="realizationOpt"
                      id="realizationOpt"
                      label="Realization option"
                      name="realizationOpt"
                      helpertext={errors?.realizationOpt?.message}
                      error={errors?.realizationOpt}
                    >
                      <MenuItem value="singleDay">
                        Single day realization
                      </MenuItem>
                      <MenuItem value="fromTo">From / to realization</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {realizationOpt === "singleDay" ? (
                  <Controller
                    name="singleDtOpt"
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
                        label="Date"
                        inputFormat="YYYY-MM-DD"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helpertext={errors?.singleDtOpt?.message}
                            error={errors?.singleDtOpt}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  />
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <Controller
                        name="fromDtOpt"
                        control={control}
                        rules={{
                          required: {
                            value: realizationOpt === "fromTo",
                            message: "This field is required."
                          }
                        }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            label="Date from"
                            inputFormat="YYYY-MM-DD"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                helpertext={errors?.fromDtOpt?.message}
                                error={errors?.fromDtOpt}
                                fullWidth
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Controller
                        name="toDtOpt"
                        control={control}
                        rules={{
                          required: {
                            value: realizationOpt === "fromTo",
                            message: "This field is required."
                          }
                        }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            label="Date to"
                            inputFormat="YYYY-MM-DD"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                helpertext={errors?.toDtOpt?.message}
                                error={errors?.toDtOpt}
                                fullWidth
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    placeholder="Write here..."
                    multiline
                    rows={3}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="done"
                control={control}
                render={({ field }) => (
                  <Tooltip title="Mark as done" arrow>
                    <Checkbox {...field} checked={field.value} name="done" />
                  </Tooltip>
                )}
              />
              <Controller
                name="important"
                control={control}
                render={({ field }) => (
                  <Tooltip title="Pin this task in Navbar">
                    <Checkbox
                      {...field}
                      name="important"
                      icon={<PushPinOutlinedIcon />}
                      checked={field.value}
                      checkedIcon={<PushPinIcon />}
                    />
                  </Tooltip>
                )}
              />
              <Tooltip title="Add new entry">
                <IconButton
                  name="addEntry"
                  children={<AddIcon />}
                  onClick={() => {
                    append(initialEntry);
                  }}
                />
              </Tooltip>
            </Grid>

            <Grid
              container
              item
              spacing={2}
              mb={1}
              mt={0.5}
              sx={{ maxHeight: "200px", overflow: "auto" }}
            >
              {entries.map((entry, index) => (
                <Entry index={index} key={index} />
              ))}
            </Grid>

            <Grid container item xs={12} justifyContent="flex-end">
              <Divider sx={{ width: "100%", mt: 1, mb: 1 }}></Divider>
              {editing ? (
                <Button
                  color="error"
                  onClick={() => {
                    submitDeleteTask(task.id);
                  }}
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
              <Button type="submit">
                {editing ? "Save changes" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </FormProvider>
  );
}

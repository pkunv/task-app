import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useFetchers, useActionData } from "react-router-dom";
import { snackbarMsgs } from "../../snackbarMsgs";

export default function SnackbarHandler() {
  const fetchers = useFetchers();
  const { enqueueSnackbar } = useSnackbar();
  const actionData = useActionData();
  useEffect(() => {
    fetchers.forEach((el) => {
      if (el.data && el.state === "loading") {
        var snackbarData = snackbarMsgs.find((snackbar) => {
          return snackbar.action === el.data.action;
        });

        enqueueSnackbar(
          el.data.success
            ? "Successfully " + snackbarData.successMsg
            : "Unsuccesfully " + snackbarData.errorMsg,
          {
            variant: el.data.success ? "success" : "error",
            preventDuplicate: true
          }
        );
      }
    });
  }, [fetchers]);

  useEffect(() => {
    if (actionData) {
      var snackbarData = snackbarMsgs.find((snackbar) => {
        return snackbar.action === actionData.action;
      });
      enqueueSnackbar(
        actionData.success
          ? "Successfully " + snackbarData.successMsg
          : "Unsuccesfully " + snackbarData.errorMsg,
        {
          variant: actionData.success ? "success" : "error",
          preventDuplicate: true
        }
      );
    }
  }, [actionData]);

  return null;
}

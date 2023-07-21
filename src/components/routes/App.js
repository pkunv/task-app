import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../../theme.js";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import MainDrawer from "../../components/modules/MainDrawer";
import MainAppBar from "../../components/modules/MainAppBar";
import SnackbarHandler from "../../components/modules/SnackbarHandler";
import Toolbar from "@mui/material/Toolbar";
import Modal from "@mui/material/Modal";
import {
  Outlet,
  useActionData,
  useNavigate,
  useSubmit,
  useFetcher
} from "react-router-dom";
import { SnackbarProvider, closeSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function App() {
  const drawerWidth = 120;
  const actionData = useActionData();
  const navigate = useNavigate();
  let submit = useSubmit();
  let fetcher = useFetcher();
  const [modalOpen, setModalOpen] = useState({
    drawer: false,
    settings: false
  });
  const handleModalToggle = (key) => {
    setModalOpen({ ...modalOpen, [key]: !modalOpen[key] });
  };
  const submitDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      submit("", { method: "post", action: `/tasks/${id}/destroy` });
    }
  };
  const taskFetcher = (id, data) => {
    const jsonData = new FormData();
    jsonData.append("task", JSON.stringify(data));
    fetcher.submit(jsonData, { method: "post", action: `/tasks/${id}` });
  };
  useEffect(() => {
    if (actionData?.redirect) {
      navigate(actionData.redirect);
    }
  }, [actionData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal
        open={modalOpen.settings}
        onClose={() => {
          handleModalToggle("settings");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>Text in a modal</Box>
      </Modal>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={1500}
        action={(snackbarId) => (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon />
          </IconButton>
        )}
      >
        <SnackbarHandler />
        <Box sx={{ display: "flex" }}>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="Navbar drawer"
          >
            <MainDrawer
              drawerWidth={drawerWidth}
              open={modalOpen.drawer}
              handleModalToggle={handleModalToggle}
            />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` }
            }}
          >
            <Toolbar />
            <MainAppBar
              drawerWidth={drawerWidth}
              drawerOpen={modalOpen.drawer}
              handleModalToggle={handleModalToggle}
            />
            <Outlet
              context={{
                modalOpen,
                setModalOpen,
                handleModalToggle,
                submitDeleteTask,
                taskFetcher
              }}
            />
          </Box>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

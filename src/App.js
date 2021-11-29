import * as React from "react";

import ImageCropper from "./components/ImageCropper";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import EventRoundedIcon from "@mui/icons-material/EventRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";

import { Routes, Route, useNavigate } from "react-router-dom";
import {
  // Welcome,
  MultipleMonths,
  SingleMonth,
  Birthdays,
  YearEvents,
} from "./pages";

import { LEFT_MENU_WIDTH } from "./const";

import AppBar from "./components/AppBar";
import { Typography } from "@mui/material";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar />

      <Drawer
        sx={{
          width: `${LEFT_MENU_WIDTH}px`,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: `${LEFT_MENU_WIDTH}px`,
            boxSizing: "border-box",
            borderRight: "1px solid lightgray",
          },
        }}
        variant="permanent"
        anchor="top"
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "stretch",
            paddingTop: "1rem",
            height: "100vh",
          }}
        >
          <Tooltip title="Photos" placement="right">
            <IconButton
              aria-label="images"
              size="large"
              sx={{ width: "50px", height: "50px", margin: "0 auto" }}
              onClick={() => navigate("design")}
            >
              <PhotoCameraRoundedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Anniversaires" placement="right">
            <IconButton
              sx={{ width: "50px", height: "50px", margin: "0 auto" }}
              aria-label="anniversaires"
              size="large"
              onClick={() => navigate("birthdays")}
            >
              <EventRoundedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <div style={{ paddingLeft: `${LEFT_MENU_WIDTH}px` }}>
        <Routes>
          {/* <Route path="/" element={<Welcome />} /> */}
          <Route path="/" element={<MultipleMonths />} />
          <Route path="design" element={<MultipleMonths />} />
          <Route path="design/:month" element={<SingleMonth />} />
          <Route path="birthdays" element={<Birthdays />} />
          <Route path="yearEvents" element={<YearEvents />} />
        </Routes>
      </div>
      <ImageCropper />
    </>
  );
}

export default App;

import * as React from "react";
import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useReactToPrint } from "react-to-print";

import { useNavigate } from "react-router-dom";
import { saveFolder } from "./fileManagement/utils";
import { useSelector } from "react-redux";

import CalendarToPrint from "./calendarGenerator";

export default function AppBar() {
  const navigate = useNavigate();

  const birthdays = useSelector((state) => state.birthdays.values);
  const months = useSelector((state) => state.pictureSystem.months);
  const dayOverride = useSelector((state) => state.dayEditing.celebrations);
  const monthColor = useSelector((state) => state.dayEditing.monthColor);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const calendarToPrintRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => calendarToPrintRef.current,
  });

  return (
    <>
      <MUIAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" onClick={handleClick}>
            Calendar
          </Typography>
          <div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/");
                  handleClose();
                }}
              >
                Accueil
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/design");
                  handleClose();
                }}
              >
                Design
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/birthdays");
                  handleClose();
                }}
              >
                Anniversaires
              </MenuItem>
            </Menu>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handlePrint()}
          >
            <LocalPrintshopRoundedIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              saveFolder({
                values: {
                  calendar: birthdays,
                  design: { pictures: months },
                  dayOverride,
                  monthColor,
                },
              });
            }}
          >
            <SaveRoundedIcon />
          </IconButton>
        </Toolbar>
      </MUIAppBar>

      <div style={{ display: "none" }}>
        <CalendarToPrint ref={calendarToPrintRef} />
      </div>
    </>
  );
}

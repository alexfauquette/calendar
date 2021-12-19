import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { startDragging } from "../features/dragging";
import { fetchPictures, setMonths } from "../features/pictureSystem";
import { setBirthdays } from "../features/birthdays";
import {
  setDayOverride as setDayOverrideAction,
  setMonthsColors as setMonthsColorsAction,
} from "../features/dayEditing";

import { LEFT_MENU_WIDTH, IMAGE_MENU_WIDTH } from "../const";

import { openFolder } from "../components/fileManagement/utils";
export default function ImageDrawer() {
  const pictures = useSelector((state) => state.pictureSystem.pictures);
  const dispatch = useDispatch();

  const setPictures = (x) => {
    dispatch(fetchPictures({ pictures: x }));
  };

  const setCalendar = (x) => {
    dispatch(setBirthdays(x));
  };

  const setDesign = ({ pictures }) => {
    dispatch(setMonths(pictures));
  };

  const setDayOverride = (x) => {
    dispatch(setDayOverrideAction(x));
  };

  const setMonthsColors = (x) => {
    dispatch(setMonthsColorsAction(x));
  };

  const picturesLoaded = pictures.length > 0;

  return (
    <Drawer
      sx={{
        width: `${IMAGE_MENU_WIDTH}px`,
        flexShrink: 0,
        marginLeft: `${LEFT_MENU_WIDTH}px`,

        "& .MuiDrawer-paper": {
          width: `${IMAGE_MENU_WIDTH}px`,
          marginLeft: `${LEFT_MENU_WIDTH}px`,
          boxSizing: "border-box",
          borderRight: "1px solid lightgray",
        },
      }}
      variant="permanent"
      anchor="top"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", height: "100vh" }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            backgroundColor: "white",
            padding: picturesLoaded ? "4px" : "100px 4px 4px 4px",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: picturesLoaded ? "row" : "column",
          }}
        >
          {picturesLoaded ? (
            <>
              <Tooltip
                title="Attention, les données non enregistrées seront perdu"
                placement="bottom"
              >
                <Button
                  onClick={() => {
                    openFolder({
                      setters: {
                        setPictures,
                        setCalendar,
                        setDesign,
                        setDayOverride,
                        setMonthsColors,
                      },
                      tryPreviousFolder: false,
                    });
                  }}
                  variant="outlined"
                >
                  Changer de dossier
                </Button>
              </Tooltip>
              <Tooltip title="Récupère les dernières image que vous avez ajoutées dans le dossier">
                <Button
                  onClick={() =>
                    openFolder({
                      setters: { setPictures },
                      tryPreviousFolder: true,
                    })
                  }
                  variant="contained"
                >
                  Rafraîchir le dossier
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  openFolder({
                    setters: {
                      setPictures,
                      setCalendar,
                      setDesign,
                      setDayOverride,
                      setMonthsColors,
                    },
                    tryPreviousFolder: true,
                  });
                }}
              >
                Ouvrir un dossier
              </Button>
              <p style={{ padding: "1rem" }}>
                Ouvrez le dossier dans lequel se trouve les images pour
                personnaliser votre calendrier
              </p>
            </>
          )}
        </Box>
        {picturesLoaded && (
          <ImageList variant="masonry" cols={2} gap={5}>
            {pictures.map(({ url, name }) => (
              <ImageListItem key={url}>
                <img
                  src={url}
                  alt=""
                  onDragStart={() => {
                    dispatch(startDragging({ src: url, name }));
                  }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Drawer>
  );
}

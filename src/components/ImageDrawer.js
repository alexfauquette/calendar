import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { startDragging } from "../features/dragging";
import { fetchPictures, setMonths } from "../features/pictureSystem";
import { setBirthdays } from "../features/birthdays";

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

  const picturesLoaded = pictures.length > 0;

  return (
    <Drawer
      sx={{
        width: 400,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 400,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="top"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <Box>
          <Button
            onClick={() => {
              openFolder({
                setters: { setPictures, setCalendar, setDesign },
                tryPreviousFolder: !picturesLoaded,
              });
            }}
          >
            {picturesLoaded ? "Changer" : "Ouvrir"}
          </Button>
          {picturesLoaded && (
            <Button
              onClick={() =>
                openFolder({
                  setters: { setPictures },
                  tryPreviousFolder: true,
                })
              }
            >
              Rafraîchir
            </Button>
          )}
        </Box>
        {picturesLoaded && (
          <ImageList variant="masonry" cols={2} gap={5}>
            {pictures.map(({ url, name }) => (
              <ImageListItem key={url}>
                <img
                  src={url}
                  width={200}
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

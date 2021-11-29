import * as React from "react";

import ImageDrawer from "../components/ImageDrawer";

import { HTMLMonth } from "../components/calendarGenerator";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { IMAGE_MENU_WIDTH } from "../const";

const MINI_MONTH_WIDTH = 210;
const MINI_MONTH_HEIGHT = 297;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

export default function MultipleMonths() {
  const navigate = useNavigate();

  const calendarRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  const [zoom, setZoom] = React.useState(1);

  React.useEffect(() => {
    if (calendarRef.current) {
      const xScale = MINI_MONTH_WIDTH / calendarRef.current.clientWidth;
      const yScale = MINI_MONTH_HEIGHT / calendarRef.current.clientHeight;

      const minScale = Math.min(xScale, yScale);
      setScale(minScale);
    }
  }, []);

  return (
    <div>
      <ImageDrawer />
      <div
        style={{
          maxHeight: "100vh",
          paddingLeft: IMAGE_MENU_WIDTH,
          paddingTop: "64px",
        }}
      >
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((monthIndex) => (
              <div
                key={monthIndex}
                style={{
                  width: zoom * MINI_MONTH_WIDTH,
                  height: zoom * MINI_MONTH_HEIGHT,
                  position: "relative",
                  margin: "2rem",
                }}
              >
                <div
                  key={monthIndex}
                  style={{
                    transform: `scale(${zoom * scale}, ${zoom * scale})`,
                    transformOrigin: "top left",
                    margin: "1rem",
                  }}
                  onClick={() => {
                    navigate(`/design/${monthIndex}`);
                  }}
                >
                  <HTMLMonth
                    year={2022}
                    month={monthIndex}
                    ref={monthIndex === 0 ? calendarRef : null}
                  />
                </div>
              </div>
            ))}
          </div>
          <Box sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}>
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={() => setZoom((x) => Math.max(MIN_ZOOM, x - 0.5))}
            >
              <RemoveIcon />
            </Fab>
            <Box
              sx={{
                margin: "0 1rem",
                width: "2rem",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              <Typography variant="p" component="span">
                {zoom}
              </Typography>
            </Box>
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={() => setZoom((x) => Math.min(MAX_ZOOM, x + 0.5))}
            >
              <AddIcon />
            </Fab>
          </Box>
        </div>
      </div>
    </div>
  );
}

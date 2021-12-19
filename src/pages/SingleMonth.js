import * as React from "react";

import ImageDrawer from "../components/ImageDrawer";

import GridViewIcon from "@mui/icons-material/GridView";

import Month from "../components/calendarGenerator/Month";

import { intlFormat } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import { setMonthColor } from "../features/dayEditing";

import { useSelector, useDispatch } from "react-redux";
import * as colors from "@mui/material/colors";

import Fab from "@mui/material/Fab";

import { LEFT_MENU_WIDTH, IMAGE_MENU_WIDTH } from "../const";

import CheckIcon from "@mui/icons-material/Check";
const ColorPalette = ({ palette, value, onChange }) => (
  <Stack direction="row" spacing={0.5} sx={{ mt: 2, ml: 1 }}>
    {Object.keys(palette).map((colorName) => (
      <Box
        sx={{
          width: 32,
          height: 32,
          color: "common.white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { cursor: "pointer" },
        }}
        style={{ backgroundColor: palette[colorName] }}
        onClick={() => {
          if (value === palette[colorName] || !onChange) {
            return;
          }
          onChange(palette[colorName]);
        }}
      >
        {value === palette[colorName] ? (
          <CheckIcon style={{ fontSize: 30 }} />
        ) : null}
      </Box>
    ))}
  </Stack>
);
const shade = 200;
const palette = {
  red: colors["red"][shade],
  pink: colors["pink"][shade],
  purple: colors["purple"][shade],
  deepPurple: colors["deepPurple"][shade],
  indigo: colors["indigo"][shade],
  blue: colors["blue"][shade],
  lightBlue: colors["lightBlue"][shade],
  cyan: colors["cyan"][shade],
  teal: colors["teal"][shade],
  green: colors["green"][shade],
  lightGreen: colors["lightGreen"][shade],
  lime: colors["lime"][shade],
  yellow: colors["yellow"][shade],
  amber: colors["amber"][shade],
  orange: colors["orange"][shade],
  deepOrange: colors["deepOrange"][shade],
};

export default function SingleMonth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { month } = useParams();

  const monthColor = useSelector(
    (state) => state.dayEditing.monthColor[Number(month)]
  );

  const [paperSize, setPaperSize] = React.useState({ width: 100, height: 100 });
  const calendarRef = React.useRef(null);
  const displayDivRef = React.useRef(null);

  const [scale, setScale] = React.useState(1);

  const updateCalendarSize = () => {
    if (calendarRef.current && displayDivRef.current) {
      const xScale =
        (displayDivRef.current.offsetWidth -
          100 -
          LEFT_MENU_WIDTH -
          IMAGE_MENU_WIDTH) /
        calendarRef.current.clientWidth;
      const yScale =
        (displayDivRef.current.offsetHeight - 100 - 114) /
        calendarRef.current.clientHeight;

      const minScale = Math.min(xScale, yScale);

      setScale(minScale);
      setPaperSize({
        width: minScale * calendarRef.current.clientWidth,
        height: minScale * calendarRef.current.clientHeight,
      });
    }
  };
  React.useEffect(() => {
    updateCalendarSize();
    const ref = displayDivRef.current;
    window.addEventListener("resize", updateCalendarSize);
    return () => {
      window.removeEventListener("resize", updateCalendarSize);
    };
  }, []);

  const handleColorChange = React.useCallback((newValue) =>
    dispatch(setMonthColor({ monthIndex: Number(month), value: newValue }))
  );

  return (
    <div>
      <ImageDrawer />
      <div
        style={{
          height: "100vh",
          paddingLeft: IMAGE_MENU_WIDTH,
          paddingTop: "64px",
        }}
        ref={displayDivRef}
      >
        <div>
          <Tabs
            sx={{ flex: "1 1 100px" }}
            value={Number(month) || 0}
            onChange={(event, newValue) => navigate(`/design/${newValue}`)}
            aria-label="month tabs"
            variant="scrollable"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((monthIndex) => (
              <Tab
                key={monthIndex}
                label={intlFormat(
                  new Date(2000, monthIndex, 1),
                  {
                    month: "short",
                  },
                  {
                    locale: "fr",
                  }
                )}
                value={monthIndex}
              />
            ))}
          </Tabs>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ position: "relative", margin: "16px", ...paperSize }}>
              <div
                style={{
                  transform: `scale(${scale}, ${scale})`,
                  transformOrigin: "top left",
                  margin: "1rem",
                }}
              >
                <Paper
                  elevation={3}
                  ref={calendarRef}
                  sx={{ width: "max-content" }}
                >
                  <Month
                    year={2022}
                    month={Number(month) || 0}
                    editableDays={true}
                  />
                </Paper>
              </div>
            </Box>
          </div>
          <ColorPalette
            palette={palette}
            value={monthColor}
            onChange={handleColorChange}
          />

          <Box sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}>
            <Fab
              color="primary"
              size="large"
              aria-label="grid-view"
              onClick={() => navigate("/design")}
            >
              <GridViewIcon />
            </Fab>
          </Box>
        </div>
      </div>
    </div>
  );
}

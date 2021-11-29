import * as React from "react";

import ImageDrawer from "../components/ImageDrawer";

import GridViewIcon from "@mui/icons-material/GridView";

import { HTMLMonth } from "../components/calendarGenerator";

import { intlFormat } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Fab from "@mui/material/Fab";

import { LEFT_MENU_WIDTH, IMAGE_MENU_WIDTH } from "../const";

export default function SingleMonth() {
  const navigate = useNavigate();

  const { month } = useParams();

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
                <HTMLMonth
                  year={2022}
                  month={Number(month) || 0}
                  ref={calendarRef}
                />
              </div>
            </Box>
          </div>
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

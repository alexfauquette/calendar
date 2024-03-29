import React from "react";
import { eachDayOfInterval, intlFormat } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Day from "./day";
import {
  PICTURE_WIDTH,
  PICTURE_HEIGHT,
  HEADER_FON_SIZE,
  HEADER_TOP_PADDING,
  HEADER_HEIGHT,
} from "../../const";
import { setGeneratedYear } from "../../features/dayEditing";
import CanvasImage from "../CanvasImage";

// Create styles
const styles = {
  page: {
    flexDirection: "column",
    backgroundColor: "transparent",
    padding: 0,
  },
  header: {
    textAlign: "center",
    fontSize: HEADER_FON_SIZE,

    paddingTop: HEADER_TOP_PADDING,
    height: HEADER_HEIGHT,

    fontFamily: "Roboto",
    textTransform: "capitalize",
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  pictures: {
    display: "flex",
    flexDirection: "column",
    height: `${3 * PICTURE_HEIGHT}cm`,
    width: `${PICTURE_WIDTH}cm`,
  },

  picture: {
    height: `${PICTURE_HEIGHT}cm`,
    width: `${PICTURE_WIDTH}cm`,
  },
  calendar: {
    flexGrow: 1,
  },
};

const Month = React.forwardRef(({ month, editableDays = false }, ref) => {
  const dispatch = useDispatch();

  const year = useSelector((state) => state.dayEditing.generatedYear);

  const days = eachDayOfInterval({
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 0),
  });

  return (
    <div style={{ ...styles.page, height: "29.7cm", width: "21cm" }} ref={ref}>
      <div style={styles.header}>
        {editableDays ? (
          <>
            <span>
              {intlFormat(
                days[0],
                {
                  month: "long",
                },
                {
                  locale: "fr",
                }
              )}
            </span>{" "}
            <Select
              value={year}
              onChange={(event) => {
                dispatch(
                  setGeneratedYear({ generatedYear: event.target.value })
                );
              }}
              variant="standard"
              sx={{
                verticalAlign: "middle",
                fontSize: "22pt",
              }}
            >
              {[2022, 2023, 2024, 2025].map((yyyy) => (
                <MenuItem key={yyyy} value={yyyy}>
                  {yyyy}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : (
          <span>
            {intlFormat(
              days[0],
              {
                month: "long",
              },
              {
                locale: "fr",
              }
            ) + ` ${year}`}
          </span>
        )}
      </div>
      <div style={styles.mainContent}>
        <div style={styles.pictures}>
          <CanvasImage
            style={styles.picture}
            monthIndex={month}
            pictureIndex={0}
          />
          <CanvasImage
            style={styles.picture}
            monthIndex={month}
            pictureIndex={1}
          />
          <CanvasImage
            style={styles.picture}
            monthIndex={month}
            pictureIndex={2}
          />
        </div>
        <div style={styles.calendar}>
          {days.map((day, index) => {
            return (
              <Day
                key={index}
                day={day}
                isLastDay={index === days.length - 1}
                isEditable={editableDays}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Month;

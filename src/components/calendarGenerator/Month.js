import React from "react";
import { eachDayOfInterval, intlFormat, getDate, getMonth } from "date-fns";
import Day from "./day";
import {
  PICTURE_WIDTH,
  PICTURE_HEIGHT,
  HEADER_FON_SIZE,
  HEADER_TOP_PADDING,
  HEADER_HEIGHT,
} from "../../const";
import CanvasImage from "../CanvasImage";

import { useSelector } from "react-redux";
import { differenceInYears } from "date-fns";

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

const Month = React.forwardRef(({ year, month }, ref) => {
  const days = eachDayOfInterval({
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 0),
  });

  const monthBirthdays = useSelector((state) =>
    state.birthdays.values.filter((row) => {
      return (
        row.birthday &&
        getMonth(new Date(year, month, 1)) === getMonth(new Date(row.birthday))
      );
    })
  );

  return (
    <div style={{ ...styles.page, height: "29.7cm", width: "21cm" }} ref={ref}>
      <div style={styles.header}>
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
            const birthdays = monthBirthdays
              .filter((row) => getDate(day) === getDate(new Date(row.birthday)))
              .map((row) => ({
                ...row,
                age: differenceInYears(day, new Date(row.birthday)),
              }));
            return (
              <Day
                key={index}
                day={day}
                isLastDay={index === days.length - 1}
                birthdays={birthdays}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Month;

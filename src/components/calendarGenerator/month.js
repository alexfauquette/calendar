import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Canvas,
  StyleSheet,
} from "@react-pdf/renderer";
import { eachDayOfInterval, intlFormat, getDate, getMonth } from "date-fns";
import Day, { HTMLDay } from "./day";
import { Font } from "@react-pdf/renderer";
import {
  PICTURE_WIDTH,
  PICTURE_HEIGHT,
  HEADER_FON_SIZE,
  HEADER_TOP_PADDING,
  HEADER_HEIGHT,
} from "../../const";
import CanvasImage from "../CanvasImage";
import Paper from "@mui/material/Paper";

import { useSelector, useDispatch } from "react-redux";
import { differenceInYears, isSameMonth } from "date-fns";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `${process.env.PUBLIC_URL}/Roboto-Regular.ttf`,
    },
    {
      src: `${process.env.PUBLIC_URL}/Roboto-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `${process.env.PUBLIC_URL}/Roboto-Italic.ttf`,
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: `${process.env.PUBLIC_URL}/Roboto-BoldItalic.ttf`,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
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
});

const Month = ({ year, month, state }) => {
  const images = state.pictureSystem.months[month];

  const days = eachDayOfInterval({
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 0),
  });

  const monthBirthdays = state.birthdays.values.filter((row) => {
    return (
      row.birthday &&
      getMonth(new Date(year, month, 1)) === getMonth(new Date(row.birthday))
    );
  });

  return (
    <Page size="A4" style={styles.page} debug={false}>
      <View style={styles.header} debug={false}>
        <Text>
          {intlFormat(
            days[0],
            {
              month: "long",
            },
            {
              locale: "fr",
            }
          ) + ` ${year}`}
        </Text>
      </View>
      <View style={styles.mainContent} debug={false}>
        <View style={styles.pictures} debug={false}>
          {images.map(({ src, croppedURL = "", ...image }, pictureIndex) => {
            const widthCM = (100 * PICTURE_WIDTH) / image.width;
            const heightCM = (100 * PICTURE_HEIGHT) / image.height;

            const topCM = (image.y * heightCM) / 100;
            const leftCM = (image.x * widthCM) / 100;

            return src ? (
              <View
                key={`${pictureIndex}-${croppedURL}`}
                style={{
                  ...styles.picture,
                  overflow: "hidden",
                  position: "relative",
                  width: `${PICTURE_WIDTH}cm`,
                  height: `${PICTURE_HEIGHT}cm`,
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    width: `${widthCM}cm`,
                    height: `${heightCM}cm`,
                    marginLeft: `${-leftCM}cm`,
                    marginTop: `${-topCM}cm`,
                  }}
                  src={src}
                  width="auto"
                  height="auto"
                />
              </View>
            ) : (
              <Canvas
                style={styles.picture}
                key={`${pictureIndex}-${croppedURL}`}
                width={PICTURE_WIDTH}
                height={PICTURE_HEIGHT}
              />
            );
          })}
        </View>
        <View style={styles.calendar} debug={false}>
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
        </View>
      </View>
    </Page>
  );
};

export const HTMLMonth = React.forwardRef(({ year, month }, ref) => {
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
    <Paper
      elevation={3}
      style={{ ...styles.page, heigh: "29.7cm", width: "21cm" }}
      ref={ref}
    >
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
              <HTMLDay
                key={index}
                day={day}
                isLastDay={index === days.length - 1}
                birthdays={birthdays}
              />
            );
          })}
        </div>
      </div>
    </Paper>
  );
});

export default Month;

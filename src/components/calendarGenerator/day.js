import React from "react";
import { format, getDate, getDay, getMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { DAY_HEIGHT, TEXT_SPACE, BORDER_WIDTH } from "../../const";
import { SAINTS } from "./saints";
import { joursFeries } from "./joursFeries";

const getFerieDay = (day) => {
  const formatedDay = format(day, "yyyy-MM-dd");
  return joursFeries[formatedDay];
};
const styles = {
  day: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    height: DAY_HEIGHT,
    paddingLeft: TEXT_SPACE,
    borderColor: "black",
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: 0,
    borderTopWidth: BORDER_WIDTH,
    borderStyle: "solid",
    margin: 0,
    boxSizing: "border-box",
    fontSize: "12pt",
  },

  dayNumber: {
    marginRight: TEXT_SPACE,
    fontSize: "12pt",
  },
  dayInitial: {},
  saint: { marginLeft: "0.2cm", fontSize: "12pt" },
  birthdays: { marginRight: "1cm", fontSize: "12pt" },
};

const Day = ({ day, isLastDay, birthdays }) => {
  const numberDay = format(day, "dd", { locale: fr });
  const weekDay = format(day, "ccccc", { locale: fr });

  const nationalCelebration = getFerieDay(day);
  return (
    <div
      style={{
        ...styles.day,
        borderBottomWidth: isLastDay ? BORDER_WIDTH : 0,
        backgroundColor:
          getDay(day) === 0 || nationalCelebration
            ? "lightblue"
            : "transparent",
      }}
    >
      <span style={styles.dayNumber}>{numberDay}</span>
      <span style={styles.dayInitial}>{weekDay}</span>
      <span style={styles.saint}>
        {nationalCelebration ||
          `St ${SAINTS?.[getMonth(day)]?.[getDate(day) - 1]}`}
      </span>
      <span style={{ flexGrow: 1 }}></span>
      <span style={styles.birthdays}>
        {birthdays
          .filter((row) => row.printed && row.nickname.trim())
          .map(
            (row) =>
              `${row.nickname.trim()} ${row.agePrinted ? `(${row.age}) ` : ""}`
          )
          .join("/ ")}
      </span>
    </div>
  );
};

export default Day;

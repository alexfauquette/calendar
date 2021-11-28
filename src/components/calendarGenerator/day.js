import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { format, getDate, getDay, getMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { DAY_HEIGHT, TEXT_SPACE, BORDER_WIDTH } from "../../const";
import { getNickName } from "../../features/birthdays";
import { SAINTS } from "./saints";

const styles = StyleSheet.create({
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
});

const Day = ({ day, isLastDay, birthdays }) => {
  const numberDay = format(day, "dd", { locale: fr });

  const weekDay = format(day, "ccccc", { locale: fr });

  const isEvenDay = Number(numberDay) % 2 === 1;
  return (
    <View
      style={{
        ...styles.day,
        borderBottomWidth: isLastDay ? BORDER_WIDTH : 0,
        backgroundColor: getDay(day) === 0 ? "lightblue" : "transparent",
      }}
    >
      <Text style={styles.dayNumber}>{numberDay}</Text>
      <Text style={styles.dayInitial}>{weekDay}</Text>
      <Text style={styles.saint}>
        St {SAINTS?.[getMonth(day)]?.[getDate(day) - 1]}
      </Text>
      <Text style={{ flexGrow: 1 }}></Text>
      <Text style={styles.birthdays}>
        {birthdays
          .filter((row) => row.printed && row.nickname.trim())
          .map(
            (row) =>
              `${row.nickname.trim()} ${row.agePrinted ? `(${row.age}) ` : ""}`
          )
          .join("/ ")}
      </Text>
    </View>
  );
};

export const HTMLDay = ({ day, isLastDay, birthdays }) => {
  const numberDay = format(day, "dd", { locale: fr });
  const weekDay = format(day, "ccccc", { locale: fr });

  return (
    <div
      style={{
        ...styles.day,
        borderBottomWidth: isLastDay ? BORDER_WIDTH : 0,
        backgroundColor: getDay(day) === 0 ? "lightblue" : "transparent",
      }}
    >
      <span style={styles.dayNumber}>{numberDay}</span>
      <span style={styles.dayInitial}>{weekDay}</span>
      <span style={styles.saint}>
        St {SAINTS?.[getMonth(day)]?.[getDate(day) - 1]}
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
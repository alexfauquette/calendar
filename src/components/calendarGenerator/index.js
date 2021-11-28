import React from "react";
import { Document } from "@react-pdf/renderer";
import Month from "./month";
export * from "./month";
// Create Document Component
const Calendar = ({ year = 2022, state, pictureUrls }) => {
  const months = [];
  for (let month = 0; month < 12; month += 1) {
    months.push(
      <Month
        year={year}
        month={month}
        key={month}
        state={state}
        pictureUrls={pictureUrls}
      />
    );
  }
  return <Document>{months}</Document>;
};

export default Calendar;

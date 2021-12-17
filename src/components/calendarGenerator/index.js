import React from "react";
import Month from "./Month";

const CalendarToPrint = React.forwardRef(
  ({ year = 2022, state, pictureUrls }, ref) => {
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
    return <div ref={ref}>{months}</div>;
  }
);

export default CalendarToPrint;

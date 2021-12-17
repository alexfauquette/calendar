import * as React from "react";

import BirthdaysTable from "../components/BirthdaysTable";

export default function Birthdays() {
  return (
    <div
      style={{
        height: "100vh",
        paddingTop: "64px",
        textAlign: "right",
      }}
    >
      <BirthdaysTable tableHeight="60vh" />
    </div>
  );
}

import * as React from "react";

import BirthdaysTable from "../components/BirthdaysTable";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentEditor } from "../features/dayEditing";
import Day from "../components/calendarGenerator/day";

export default function DayEditor() {
  const currentEditor = useSelector((state) => state.dayEditing.currentEditor);
  const dispatch = useDispatch();

  const isOpen =
    currentEditor &&
    Number.isInteger(currentEditor.day) &&
    Number.isInteger(currentEditor.monthIndex) &&
    Number.isInteger(currentEditor.year);

  const day =
    new Date(
      currentEditor?.year,
      currentEditor?.monthIndex,
      currentEditor?.day
    ) || null;
  const close = () => {
    dispatch(setCurrentEditor(null));
  };
  return (
    <Dialog open={!!isOpen} onClose={close} maxWidth="lg" fullWidth>
      {isOpen && (
        <>
          <DialogTitle>
            Édite le {currentEditor?.day}/{currentEditor?.monthIndex + 1}
          </DialogTitle>
          <DialogContent>
            <Day day={day} isLastDay />

            <BirthdaysTable
              autoHeight
              day={currentEditor?.day}
              monthIndex={currentEditor?.monthIndex}
            />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

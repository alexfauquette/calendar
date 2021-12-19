import * as React from "react";

import BirthdaysTable from "../components/BirthdaysTable";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentEditor } from "../features/dayEditing";
import Day from "../components/calendarGenerator/day";
import { format, getMonth, getDate } from "date-fns";
import { fr } from "date-fns/locale";
import { Typography } from "@mui/material";

import { SAINTS } from "../components/calendarGenerator/saints";
import { getFerieDay } from "../components/calendarGenerator/joursFeries";
import {
  setCelebration,
  dayCelebrationSelector,
  getDayKey,
} from "../features/dayEditing";

const filter = createFilterOptions();

export default function DayEditor() {
  const currentEditor = useSelector((state) => state.dayEditing.currentEditor);
  const dispatch = useDispatch();

  const isOpen =
    currentEditor &&
    Number.isInteger(currentEditor.day) &&
    Number.isInteger(currentEditor.monthIndex) &&
    Number.isInteger(currentEditor.year);

  const day = isOpen
    ? new Date(
        currentEditor?.year,
        currentEditor?.monthIndex,
        currentEditor?.day
      )
    : null;
  const customCelebration = useSelector(dayCelebrationSelector(day));

  const close = () => {
    dispatch(setCurrentEditor(null));
  };

  const nationalCelebration = getFerieDay(day);
  const options = [];
  if (nationalCelebration) {
    options.push(nationalCelebration);
  }
  options.push(`St ${SAINTS?.[getMonth(day)]?.[getDate(day) - 1]}`);

  const celebration =
    customCelebration != null ? customCelebration : options[0];

  return (
    <Dialog open={!!isOpen} onClose={close} maxWidth="xl" fullWidth>
      {isOpen && (
        <>
          <DialogTitle>
            {format(day, "EEEE d LLLL yyy", { locale: fr })}
          </DialogTitle>
          <DialogContent>
            <Typography>Affichage</Typography>
            <Box sx={{ maxWidth: "13cm", m: "auto", mb: 2 }}>
              <Day day={day} isLastDay />
            </Box>
            <Divider />
            <Stack
              sx={{ mt: 2 }}
              direction="row"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ mb: 2 }}>Information</Typography>
                <Autocomplete
                  id="celebration"
                  freeSolo
                  options={options}
                  value={celebration}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option
                    );
                    if (inputValue != null && !isExisting) {
                      filtered.unshift(inputValue);
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  onChange={(event, value) => {
                    dispatch(setCelebration({ day: getDayKey(day), value }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="fête" />
                  )}
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ mb: 2 }}>Anniversaires</Typography>
                <BirthdaysTable
                  autoHeight
                  simplified
                  day={currentEditor?.day}
                  monthIndex={currentEditor?.monthIndex}
                />
              </Box>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

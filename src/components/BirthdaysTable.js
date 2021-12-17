import * as React from "react";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import {
  upsertBirthday,
  removeBirthday,
  getNickName,
} from "../features/birthdays";

import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { getDate, getMonth } from "date-fns";

export default function BirthdaysTable({
  day = null,
  monthIndex = null,
  tableHeight = "auto",
  autoHeight = false,
}) {
  const values = useSelector((state) => state.birthdays.values);
  let rows = values;
  let defaultBirthday = new Date();
  if (day !== null && monthIndex !== null) {
    defaultBirthday.setFullYear(1901, monthIndex, day);
    rows = values.filter((row) => {
      if (!row.birthday) {
        return false;
      }

      const date = new Date(row.birthday);
      return getMonth(date) === monthIndex && getDate(date) === day;
    });
  }

  const dispatch = useDispatch();

  const birthdayColumns = [
    {
      headerName: "Nom",
      field: "firstName",
      editable: true,
      flex: 2,
    },
    {
      headerName: "Prénom",
      field: "lastName",
      editable: true,
      flex: 2,
    },
    {
      headerName: "Présentation",
      field: "nickname",
      editable: true,
      flex: 2,
    },
    {
      headerName: "Date de naissance",
      field: "birthday",
      type: "date",
      valueGetter: ({ value }) => {
        return new Date(value);
      },
      editable: true,
      flex: 1,
    },
    {
      headerName: "Afficher",
      field: "printed",
      type: "boolean",
      editable: true,
      flex: 1,
    },
    {
      headerName: "Afficher l'age",
      field: "agePrinted",
      type: "boolean",
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => dispatch(removeBirthday({ id: params.id }))}
        />,
      ],
    },
  ];

  return (
    <>
      <div
        style={{ width: "100%", height: autoHeight ? undefined : tableHeight }}
      >
        <DataGrid
          autoHeight={autoHeight}
          columns={birthdayColumns}
          rows={rows}
          onCellEditCommit={({ id, field, value }) => {
            const newValue = { id, [field]: value };

            if (field === "nickname") {
              dispatch(upsertBirthday(newValue));
              return;
            }
            if (["firstName", "lastName"].includes(field)) {
              const row = rows.find((row) => row.id === id);

              if (row.nickname === getNickName(row)) {
                dispatch(
                  upsertBirthday({
                    ...newValue,
                    nickname: getNickName({ ...row, ...newValue }),
                  })
                );
                return;
              }
            }
            dispatch(upsertBirthday(newValue));
          }}
        />
      </div>
      <Button
        variant="outlined"
        sx={{ mt: 2, mr: 2 }}
        onClick={() => {
          dispatch(upsertBirthday({ birthday: defaultBirthday }));
        }}
      >
        Ajouter une ligne
      </Button>
    </>
  );
}

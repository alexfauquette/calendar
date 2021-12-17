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

export default function Birthdays() {
  const values = useSelector((state) => state.birthdays.values);
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
    <div
      style={{
        height: "100vh",
        paddingTop: "64px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          height: "60vh",
          width: "100%",
        }}
      >
        <DataGrid
          columns={birthdayColumns}
          rows={values}
          onCellEditCommit={({ id, field, value }) => {
            const newValue = { id, [field]: value };

            if (field === "nickname") {
              dispatch(upsertBirthday(newValue));
              return;
            }
            if (["firstName", "lastName"].includes(field)) {
              const row = values.find((row) => row.id === id);

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
          // autoHeight
        />
      </div>
      <Button
        onClick={() => {
          dispatch(upsertBirthday());
        }}
      >
        Ajouter une ligne
      </Button>
    </div>
  );
}

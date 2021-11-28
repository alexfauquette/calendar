import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  upsertBirthday,
  removeBirthday,
  getNickName,
} from "../features/birthdays";

import { DataGrid } from "@mui/x-data-grid";

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
];

export default function Birthdays() {
  const values = useSelector((state) => state.birthdays.values);
  const dispatch = useDispatch();

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

      {/* {loadedPictures.length === 0 && (
        <Card
          sx={{ minWidth: 275, maxWidth: 500, margin: "1rem auto" }}
          variant="outlined"
        >
          <CardContent
            sx={{
              textAlign: "left",
            }}
          >
            <Typography>Bienvenu,</Typography>
            <Typography variant="body1">
              Pour utiliser cette application, mettez toutes les photos qu vous
              souhaitez utiliser dans un dossier, et ouvrez ce dossier avec le
              bouton ci dessous.
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={onClick}>Ouvrir le dossier</Button>
          </CardActions>
        </Card>
      )} */}
    </div>
  );
}

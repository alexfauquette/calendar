// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// import { useNavigate } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
// import { openFolder } from "../features/pictureSystem";

// import { get, set } from "idb-keyval";

// const isImage = (name) => {
//   const upperCaseName = name.toUpperCase();
//   return [".JPG", ".JPEG", ".PNG"].some((extension) =>
//     upperCaseName.endsWith(extension)
//   );
// };

// async function verifyPermission(fileHandle, readWrite) {
//   const options = {};
//   if (readWrite) {
//     options.mode = "readwrite";
//   }
//   // Check if permission was already granted. If so, return true.
//   if ((await fileHandle.queryPermission(options)) === "granted") {
//     return true;
//   }
//   // Request permission. If the user grants permission, return true.
//   if ((await fileHandle.requestPermission(options)) === "granted") {
//     return true;
//   }
//   // The user didn't grant permission, so return false.
//   return false;
// }

// export default function Welcome() {
//   const navigate = useNavigate();

//   const loadedPictures = useSelector((state) => state.pictureSystem.pictures);
//   const dispatch = useDispatch();

//   const onClick = async () => {
//     const fileHandleOrUndefined = await get("file");

//     const hasAccess = await verifyPermission(fileHandleOrUndefined, true);

//     console.log({ fileHandleOrUndefined });

//     let dirHandle;
//     if (!hasAccess) {
//       dirHandle = await window.showDirectoryPicker({
//         // startIn: fileHandleOrUndefined,
//         id: "openText",
//       });
//       console.log({ dirHandle });

//       set("file", dirHandle);
//     } else {
//       dirHandle = fileHandleOrUndefined;
//     }

//     const pictures = [];
//     for await (const entry of dirHandle.values()) {
//       if (isImage(entry.name)) {
//         const f = await entry.getFile();
//         const url = URL.createObjectURL(f);
//         pictures.push({
//           url,
//           name: entry.name,
//         });
//       }
//     }
//     dispatch(openFolder({ pictures }));

//     if (pictures.length > 0) {
//       navigate("/design");
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         paddingTop: "64px",
//         textAlign: "center",
//       }}
//     >
//       {loadedPictures.length === 0 && (
//         <Card
//           sx={{ minWidth: 275, maxWidth: 500, margin: "1rem auto" }}
//           variant="outlined"
//         >
//           <CardContent
//             sx={{
//               textAlign: "left",
//             }}
//           >
//             <Typography>Bienvenu,</Typography>
//             <Typography variant="body1">
//               Pour utiliser cette application, mettez toutes les photos qu vous
//               souhaitez utiliser dans un dossier, et ouvrez ce dossier avec le
//               bouton ci dessous.
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button onClick={onClick}>Ouvrir le dossier</Button>
//           </CardActions>
//         </Card>
//       )}
//     </div>
//   );
// }

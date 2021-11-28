// import * as React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { openFolder } from "../features/pictureSystem";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// const isImage = (name) => {
//   const upperCaseName = name.toUpperCase();
//   return [".JPG", ".JPEG", ".PNG"].some((extension) =>
//     upperCaseName.endsWith(extension)
//   );
// };

// export default function OpenFolderDialog() {
//   const loadedPictures = useSelector((state) => state.pictureSystem.pictures);
//   const dispatch = useDispatch();

//   const onClick = async () => {
//     const memDirHandler = window.localStorage.getItem("dirHandle");
//     console.log({ memDirHandler });
//     const dirHandle = await window.showDirectoryPicker({
//       startIn: memDirHandler || "pictures",
//     });
//     console.log({ dirHandle });

//     window.localStorage.setItem("dirHandle", dirHandle);
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
//   };

//   return (
//     <Dialog open={loadedPictures.length === 0}>
//       <DialogTitle>Ouverture</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Veuillez ouvrir le dossier où se trouve toutes vos photos
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClick}>Choose Folder</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

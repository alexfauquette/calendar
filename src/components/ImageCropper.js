import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cropper from "react-easy-crop";
import { PICTURE_HEIGHT, PICTURE_WIDTH } from "../const";
import { setCropper, updatePicture } from "../features/pictureSystem";

import CloseIcon from "@mui/icons-material/Close";

import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { width } from "@mui/system";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function ImageCropper() {
  const cropperState = useSelector((state) => state.pictureSystem.cropper);
  const initialCroppedAreaPixels = useSelector((state) => {
    if (state.pictureSystem.cropper) {
      return state.pictureSystem.months[state.pictureSystem.cropper.monthIndex][
        state.pictureSystem.cropper.pictureIndex
      ].croppedAreaPixels;
    }
    return null;
  });

  const [crop, setCrop] = React.useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState(1);
  const [mediaSize, setMediaSize] = React.useState();

  const [currentCroppedArea, setCurrentCroppedArea] = React.useState(null);
  const [currentCroppedAreaPixels, setCurrentCroppedAreaPixels] =
    React.useState(null);

  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCurrentCroppedArea(croppedArea);
    setCurrentCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setCropper(null));
  };

  const validate = () => {
    if (currentCroppedArea && mediaSize) {
      dispatch(
        updatePicture({
          monthIndex: cropperState.monthIndex,
          pictureIndex: cropperState.pictureIndex,
          ...currentCroppedArea,
          croppedAreaPixels: currentCroppedAreaPixels,
        })
      );
    }
    handleClose();
  };

  const onMediaLoaded = (mediaSize) => {
    setMediaSize(mediaSize);
  };
  const open = !!cropperState;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Crop Image
      </BootstrapDialogTitle>

      <DialogContent dividers>
        {cropperState && (
          <div style={{ position: "relative", height: "60vh" }}>
            <Cropper
              image={cropperState.src || null}
              crop={crop}
              zoom={zoom}
              aspect={PICTURE_WIDTH / PICTURE_HEIGHT}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onMediaLoaded={onMediaLoaded}
              initialCroppedAreaPixels={initialCroppedAreaPixels}
              maxZoom={50}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={validate}>Save changes</Button>
      </DialogActions>
    </Dialog>
  );
}

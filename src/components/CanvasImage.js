import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PICTURE_HEIGHT, PICTURE_WIDTH } from "../const";
import { setCropper, updatePicture } from "../features/pictureSystem";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import Box from "@mui/material/Box";

export default function CanvasImage({
  width = PICTURE_WIDTH * 500,
  height = PICTURE_HEIGHT * 500,
  monthIndex,
  pictureIndex,
  ...others
}) {
  const image = useSelector(
    (state) => state.pictureSystem.months[monthIndex][pictureIndex]
  );
  const draggingSrc = useSelector((state) => state.dragging.src);
  const draggingName = useSelector((state) => state.dragging.name);
  const canvasRef = React.useRef(null);
  const dispatch = useDispatch();

  const onDrop = (e) => {
    console.log({ draggingName, draggingSrc });
    e.preventDefault();
    dispatch(
      updatePicture({
        monthIndex,
        pictureIndex,
        src: draggingSrc,
        name: draggingName,
      })
    );
  };

  const onClick = (event) => {
    event.stopPropagation();
    dispatch(setCropper({ src: image?.src, monthIndex, pictureIndex }));
  };

  React.useEffect(() => {
    if (image && image.src) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      let img = new Image();

      const modifiedImages = { ...image };

      img.addEventListener(
        "load",
        function () {
          if (
            modifiedImages.x === undefined ||
            modifiedImages.y === undefined ||
            modifiedImages.width === undefined ||
            modifiedImages.height === undefined ||
            modifiedImages.imageWidth === undefined ||
            modifiedImages.imageHeight === undefined
          ) {
            // if cropped unknown take largest scale
            const fullWidth = img.width / width < img.height / height;

            modifiedImages.x = 0;
            modifiedImages.y = 0;
            modifiedImages.width = fullWidth
              ? 100
              : (100 * img.height * width) / (height * img.width);
            modifiedImages.height = fullWidth
              ? (100 * img.width * height) / (width * img.height)
              : 100;

            dispatch(
              updatePicture({
                monthIndex,
                pictureIndex,
                ...modifiedImages,
                imageWidth: width,
                imageHeight: height,
              })
            );
          }
          context.drawImage(
            img,
            (modifiedImages.x * img.width) / 100,
            (modifiedImages.y * img.height) / 100,
            (modifiedImages.width * img.width) / 100,
            (modifiedImages.height * img.height) / 100,
            0,
            0,
            width,
            height
          );
        },
        false
      );
      img.src = image.src;
    }
  }, [image, image.src, width, height, dispatch, monthIndex, pictureIndex]);

  return image.src ? (
    <canvas
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      ref={canvasRef}
      width={width}
      height={height}
      id={`canvasImage-${monthIndex}-${pictureIndex}`}
      {...others}
    />
  ) : (
    <Box
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{
        borderRadius: "2cm",
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...others}
    >
      <PhotoCameraRoundedIcon
        sx={{
          fontSize: 50,
        }}
      />
    </Box>
  );
}

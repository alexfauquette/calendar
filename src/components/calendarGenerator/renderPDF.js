import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Canvas,
  StyleSheet,
} from "@react-pdf/renderer";
import { eachDayOfInterval, intlFormat, getDate, getMonth } from "date-fns";
import Day, { HTMLDay } from "./day";
import { Font } from "@react-pdf/renderer";
import {
  PICTURE_WIDTH,
  PICTURE_HEIGHT,
  HEADER_FON_SIZE,
  HEADER_TOP_PADDING,
  HEADER_HEIGHT,
} from "../../const";
import CanvasImage from "../CanvasImage";
import Calendar from "./index";
import Paper from "@mui/material/Paper";

import { PDFViewer } from "@react-pdf/renderer";
import { useSelector, useDispatch } from "react-redux";
import { differenceInYears, isSameMonth } from "date-fns";

import ImageCropper from "../ImageCropper";
import { width } from "@mui/system";

const RenderPDF = () => {
  const state = useSelector((state) => state);

  const months = state.pictureSystem.months;

  const pictureUrls = {};

  return (
    <PDFViewer width="100%" height="1000px">
      <Calendar state={state} pictureUrls={pictureUrls} />
    </PDFViewer>
  );
};

export default RenderPDF;

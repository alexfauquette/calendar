import * as React from "react";

import ImageCropper from "./components/ImageCropper";

import { Routes, Route } from "react-router-dom";
import {
  // Welcome,
  MultipleMonths,
  SingleMonth,
  Birthdays,
  YearEvents,
} from "./pages";

import AppBar from "./components/AppBar";

function App() {
  // this should be called only when rendering the pdf for preview or download
  // const state = useSelector((state) => state);

  return (
    <>
      <AppBar />
      <Routes>
        {/* <Route path="/" element={<Welcome />} /> */}
        <Route path="/" element={<MultipleMonths />} />
        <Route path="design" element={<MultipleMonths />} />
        <Route path="design/:month" element={<SingleMonth />} />
        <Route path="birthdays" element={<Birthdays />} />
        <Route path="yearEvents" element={<YearEvents />} />
      </Routes>
      {/* <OpenFolderDialog /> */}

      {/* <PDFViewer width="100%" height="1000px">
          <Calendar state={state} />
        </PDFViewer> */}
      <ImageCropper />
    </>
  );
}

export default App;

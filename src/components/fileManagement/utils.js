import { get, set } from "idb-keyval";

export const isImage = (name) => {
  const upperCaseName = name.toUpperCase();
  return [".JPG", ".JPEG", ".PNG"].some((extension) =>
    upperCaseName.endsWith(extension)
  );
};

export async function verifyPermission(fileHandle, readWrite) {
  if (fileHandle == undefined) {
    return false;
  }
  const options = {};
  if (readWrite) {
    options.mode = "readwrite";
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === "granted") {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === "granted") {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}

export async function getFolderHandler(tryPreviousFolder) {
  if (tryPreviousFolder) {
    const fileHandleOrUndefined = await get("last_folder");

    const hasAccess = await verifyPermission(fileHandleOrUndefined, true);
    if (hasAccess) {
      return fileHandleOrUndefined;
    }
  }
  const dirHandle = await window.showDirectoryPicker({
    startIn: "pictures",
  });
  set("last_folder", dirHandle);

  return dirHandle;
}

export async function openFolder({
  setters: { setPictures, setDesign, setCalendar },
  tryPreviousFolder,
}) {
  const dirHandle = await getFolderHandler(tryPreviousFolder);
  if (!dirHandle) {
    return;
  }

  const pictures = [];

  let designObject = null;
  let calendarObject = null;

  for await (const entry of dirHandle.values()) {
    if (setPictures && isImage(entry.name)) {
      const f = await entry.getFile();
      const url = URL.createObjectURL(f);
      pictures.push({
        url,
        name: entry.name,
      });
    } else if (setCalendar && entry.name === "calendar.json") {
      const f = await entry.getFile();
      const text = await f.text();
      calendarObject = JSON.parse(text);
    } else if (setDesign && entry.name === "design.json") {
      const f = await entry.getFile();
      const text = await f.text();
      designObject = JSON.parse(text);
    }
  }

  if (setPictures) {
    setPictures(pictures);
  }
  if (setDesign && designObject) {
    designObject.pictures.forEach((month) => {
      month.forEach((picture) => {
        if (picture && picture.src) picture.src = undefined;
      });
    });
    console.log(designObject);
    setDesign(designObject);
  }
  if (setCalendar && calendarObject) {
    setCalendar(calendarObject);
  }
}

export async function saveFolder({
  values: { design, calendar },
  tryPreviousFolder = true,
}) {
  const dirHandle = await getFolderHandler(tryPreviousFolder);

  if (!dirHandle) {
    return;
  }

  if (design) {
    const fileHandle = await dirHandle.getFileHandle("design.json", {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(JSON.stringify(design));
    // Close the file and write the contents to disk.
    await writable.close();
  }

  if (calendar) {
    const fileHandle = await dirHandle.getFileHandle("calendar.json", {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(JSON.stringify(calendar));
    // Close the file and write the contents to disk.
    await writable.close();
  }
}

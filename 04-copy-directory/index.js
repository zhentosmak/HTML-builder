const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

let copyFolderName = path.join(__dirname, 'files-copy');
let folderName = path.join(__dirname, 'files');

fs.mkdir(copyFolderName, { recursive: true }, (err) => {
  if (err) console.log(err);
});

fs.readdir(folderName, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);

  async function copyFiles(files, allCopyFiles) {
    await allCopyFiles.forEach((file) => {
      let copyFileName = path.join(__dirname, 'files-copy', file);
      fsPromises.unlink(copyFileName);
    });

    await files.forEach((file) => {
      let fileName = path.join(__dirname, 'files', file.name);
      let copyFileName = path.join(__dirname, 'files-copy', file.name);
      fsPromises.copyFile(fileName, copyFileName);
    });
  }

  fs.readdir(copyFolderName, (err, allCopyFiles) => {
    if (err) console.log(err);
    copyFiles(files, allCopyFiles);
  });
});

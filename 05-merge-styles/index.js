const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

let folderName = path.join(__dirname, 'styles');
fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

async function readFiles() {
  const cssFiles = await fsPromises.readdir(folderName, {
    withFileTypes: true,
  });

  async function readFile(fileName) {
    let text = await fsPromises.readFile(fileName);
    let outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

    await fsPromises.appendFile(outputFile, text.toString());
  }

  await cssFiles.forEach((file) => {
    let fileName = path.join(__dirname, 'styles', file.name);
    let ext = path.parse(fileName).ext.split('.')[1];
    if (file.isFile() && ext === 'css') readFile(fileName);
  });
}

readFiles();
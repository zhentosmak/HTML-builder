const fs = require('fs');
const path = require('path');

let folderName = path.join(__dirname, 'secret-folder');

fs.readdir(folderName, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    let fileName = path.join(__dirname, 'secret-folder', file.name);
    
    if (file.isFile()) {
      fs.stat(fileName, (err, stats) => {
        let name = path.parse(fileName).name;
        let ext = path.parse(fileName).ext.split('.')[1];
        let size = (stats.size / 1000) + 'kb';
        console.log(`${name} - ${ext} - ${size}`);
      });
    }
  });
});
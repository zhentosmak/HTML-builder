const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(fileName, 'utf-8');
let message = '';
stream.on('data', partMessage => message += partMessage);
stream.on('end', () => console.log(message));
stream.on('error', error => console.log('Error', error.message));
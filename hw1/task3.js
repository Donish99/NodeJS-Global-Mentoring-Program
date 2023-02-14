import csvtojson from 'csvtojson';
import fs from 'fs';
const csvFilePath = './input.csv';
const txtFilePath = './output.txt';

const writeStream = fs.createWriteStream(txtFilePath, {flags: 'a'});

const csvConverter = csvtojson()
  .fromFile(csvFilePath)
  .subscribe((jsonObj) => {
    writeStream.write(`${jsonObj.Book},${jsonObj.Author},${jsonObj.Amount},${jsonObj.Price}\n`);
  }, (err) => {
    console.error(err);
  }, () => {
    console.log('CSV to TXT conversion completed!');
  });

writeStream.on('open', function (fd) {
  console.log('Writing output to ' + txtFilePath);
});

writeStream.on('error', function (err) {
  console.error('Error writing output file: ' + err);
});

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

let btnCreate = document.getElementById('btnCreate');
let btnRead = document.getElementById('btnRead');
let btnUpdate = document.getElementById('btnUpdate');
let btnDelete = document.getElementById('btnDelete');
let fileName = document.getElementById('fileName');
let fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');

btnCreate.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

  fs.writeFile(file, contents, function(err) {
    if (err) {
      return console.log(err);
    }
    let txtfile = document.getElementById('fileName').value;
    alert(txtfile + ' text file was created');
    console.log('The file was created');

    // Clear input fields
    fileName.value = '';
    fileContents.value = '';

    // Set focus back to the fileContents input field
    fileContents.focus();
  });
});

btnRead.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value);

  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    fileContents.value = data;
    console.log('The file was read');
  });
});

btnUpdate.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

  fs.writeFile(file, contents, function(err) {
    if (err) {
      return console.log(err);
    }
    let txtfile = document.getElementById('fileName').value;
    alert(txtfile + ' text file was updated');
    console.log('The file was updated');

    // Clear input fields
    fileName.value = '';
    fileContents.value = '';

    // Set focus back to the fileName input field
    fileName.focus();
  });
});

btnDelete.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value);

  fs.unlink(file, function(err) {
    if (err) {
      return console.log(err);
    }
    fileName.value = '';
    fileContents.value = '';
    console.log('The file was deleted');
  });
});

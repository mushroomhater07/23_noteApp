const express = require('express');
const app = express();
const xlsx = require('xlsx');

// Set up the endpoint for displaying the XLSX file
app.get('/', (req, res) => {
  // Read the XLSX file
  const workbook = xlsx.readFile('./all/chatGPT.xlsx'); // Replace with the path to your file

  // Get the data from the first sheet in the XLSX file
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Render the data as a table on the webpage
  let html = '<html><head><title>XLSX Viewer</title></head><body>';
  html += '<table>';
  html += '<thead><tr>';
  for (const header in data[0]) {
    html += `<th>${header}</th>`;
  }
  html += '</tr></thead>';
  html += '<tbody>';
  for (const row of data) {
    html += '<tr>';
    for (const cell in row) {
      html += `<td>${row[cell]}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody>';
  html += '</table>';

  // Add a form for adding new rows to the XLSX file
  html += '<form method="post">';
  for (const header in data[0]) {
    html += `<label>${header}: <input type="text" name="${header}"></label><br>`;
  }
  html += '<button type="submit">Add Row</button>';
  html += '</form>';

  html += '</body></html>';

  res.send(html);
});

// Set up the endpoint for adding a new row to the XLSX file
app.post('/', (req, res) => {
  const workbook = xlsx.readFile('./all/chatGPT.xlsx'); // Replace with the path to your file
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Get the data from the form submission
  const newRow = {};
  for (const header in req.body) {
    newRow[header] = req.body[header];
  }

  // Add the new row to the XLSX file
  const range = xlsx.utils.decode_range(worksheet['!ref']);
  const newRowRef = `A${range.e.r + 2}:` + xlsx.utils.encode_col(range.e.c) + `${range.e.r + 2}`;
  worksheet[newRowRef] = [];
  for (const header in newRow) {
    worksheet[newRowRef].push({ v: newRow[header] });
  }
  xlsx.writeFile(workbook, './all/chatGPT.xlsx'); // Replace with the path to your file

  // Redirect back to the main page
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

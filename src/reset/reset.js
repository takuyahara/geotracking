const HEADER = [["ID", "Place", "Datetime", "Trigger", "RawData"]];
const COLUMN_DATETIME = 3;
const MAX_ROWS = 100;
const SHEET_NAME = "Log";

function resetSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Remove unnecessary sheets
  const sheetsToDelete = spreadsheet.getSheets();
  const sheet = spreadsheet.insertSheet();
  for (const sheet of sheetsToDelete) {
    spreadsheet.deleteSheet(sheet);
  }
  sheet.setName(SHEET_NAME);
  // Remove unnecessary cells
  sheet.deleteColumns(
    HEADER[0].length + 1,
    sheet.getMaxColumns() - HEADER[0].length
  );
  sheet.deleteRows(
    HEADER.length,
    sheet.getMaxRows() - MAX_ROWS - HEADER.length
  );
  // Decorate
  const maxRows = sheet.getMaxRows();
  const maxColumns = sheet.getMaxColumns();
  const rangeAll = sheet.getRange(1, 1, maxRows, maxColumns);
  rangeAll.setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    "#000000",
    SpreadsheetApp.BorderStyle.SOLID
  );
  const rangeDataDate = sheet.getRange(
    HEADER.length + 1,
    COLUMN_DATETIME,
    maxRows - HEADER.length,
    1
  );
  rangeDataDate.setNumberFormat('yyyy"/"mm"/"dd" "hh":"mm":"ss');
  const rangeHeader = sheet.getRange(1, 1, HEADER.length, maxColumns);
  rangeHeader
    .setValues(HEADER)
    .setBackground("#1155cc")
    .setFontColor("#ffffff");
  rangeAll.createFilter();
  sheet.setFrozenRows(HEADER.length);
}

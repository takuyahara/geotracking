const SHEET_NAME_LOG = "Log";
const SHEET_NAME_INVERT = "Invert";

function resetSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetsToDelete = spreadsheet.getSheets();
  const sheetDummy = spreadsheet.insertSheet();
  for (const sheet of sheetsToDelete) {
    spreadsheet.deleteSheet(sheet);
  }
  TrackingLog.insertSheet(SHEET_NAME_LOG);
  TrackingInvert.insertSheet(SHEET_NAME_INVERT);
  spreadsheet.deleteSheet(sheetDummy);
}

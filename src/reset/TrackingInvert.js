class TrackingInvert {
  static get HEADER() {
    return [["Place"]];
  }
  static get COLUMN_PLACE() {
    return 1;
  }
  static get MAX_ROWS() {
    return 1;
  }
  /**
   * @param {string} name Sheet's name
   */
  static insertSheet(name) {
    const { HEADER, COLUMN_PLACE, MAX_ROWS } = TrackingInvert;
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.insertSheet(name);
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
    const rangeHeader = sheet.getRange(1, 1, HEADER.length, maxColumns);
    rangeHeader.setValues(HEADER).setBackground("#b6d7a8");
    const cellHeaderPlace = sheet.getRange(HEADER.length, COLUMN_PLACE);
    cellHeaderPlace.setNote("If matches enter means exit and vice versa.");
    rangeAll.createFilter();
    sheet.setFrozenRows(HEADER.length);
  }
}
exports.TrackingInvert = TrackingInvert;

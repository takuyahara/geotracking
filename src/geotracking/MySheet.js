const { MyRecord } = require("./MyRecord");

class MySheet {
  static get ROW_DATA_FROM() {
    return 2;
  }
  /**
   * @param {string} name Sheet's name
   */
  constructor(name) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    /** @private */
    this.sheet = spreadsheet.getSheetByName(name);
  }
  /**
   * @param {string} place
   */
  getPreviousRecordByPlace(place) {
    const { ROW_DATA_FROM } = MySheet;
    const { sheet } = this;
    if (sheet === null) {
      throw new ReferenceError("`sheet` is null!");
    }
    const maxRows = sheet.getMaxRows();
    const maxColumns = sheet.getMaxColumns();
    const rangeData = sheet.getRange(
      ROW_DATA_FROM,
      1,
      maxRows - ROW_DATA_FROM + 1,
      maxColumns
    );
    const valuesData = rangeData.getValues();
    /** @type {MyRecord[]} */
    const records = valuesData.map(
      (rowData) =>
        new MyRecord(rowData[0], rowData[1], rowData[2], rowData[3], rowData[4])
    );
    const matchedRecord = records.find((record) => record.place === place);
    return matchedRecord;
  }
  /**
   * @param {MyRecord[]} records Record to insert
   */
  unshiftRecords(...records) {
    const { ROW_DATA_FROM } = MySheet;
    const { sheet } = this;
    if (sheet === null) {
      throw new ReferenceError("`sheet` is null!");
    }
    const maxRows = sheet.getMaxRows();
    const maxColumns = sheet.getMaxColumns();
    for (const record of records) {
      sheet.insertRowBefore(ROW_DATA_FROM);
      const rangeFirstDataRow = sheet.getRange(ROW_DATA_FROM, 1, 1, maxColumns);
      rangeFirstDataRow.setValues([record.getValues()]);
    }
    sheet.deleteRow(maxRows);
  }
}
exports.MySheet = MySheet;

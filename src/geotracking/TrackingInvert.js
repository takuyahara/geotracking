class TrackingInvert {
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
  placeExists(place) {
    const { ROW_DATA_FROM } = TrackingInvert;
    const { sheet } = this;
    if (sheet === null) {
      throw new ReferenceError("`sheet` is null!");
    }
    const maxRows = sheet.getMaxRows();
    const rangeData = sheet.getRange(
      ROW_DATA_FROM,
      1,
      maxRows - ROW_DATA_FROM + 1,
      1
    );
    const valuesData = rangeData.getValues();
    const places = valuesData.map((valuesRow) => valuesRow[0]);
    const placeExists = places.includes(place);
    return placeExists;
  }
}
exports.TrackingInvert = TrackingInvert;

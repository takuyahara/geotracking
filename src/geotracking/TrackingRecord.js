class TrackingRecord {
  /**
   * @param {string} id
   * @param {string} place
   * @param {Date} datetime
   * @param {string} trigger
   * @param {string} rawData
   */
  constructor(id, place, datetime, trigger, rawData) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.place = place;
    /** @type {Date} */
    this.datetime = datetime;
    /** @type {string} */
    this.trigger = trigger;
    /** @type {string} */
    this.rawData = rawData;
  }
  getValues() {
    const { id, place, datetime, trigger, rawData } = this;
    return [id, place, datetime, trigger, rawData];
  }
}

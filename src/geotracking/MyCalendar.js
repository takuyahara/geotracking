class MyCalendar {
  /**
   * @param {string} name Calendar's name
   */
  constructor(name) {
    /** @type {number} Temporary duration of event when started */
    this.temporaryDuration = 15 * 60 * 1000; // 15 mins
    /** @private */
    this.calendar = CalendarApp.getCalendarsByName(name)[0];
  }
  /**
   * @param {string} title Event's name
   * @param {Date} startTime Event's start time
   * @return {string} Created event's ID
   */
  startEvent(title, startTime) {
    const { temporaryDuration, calendar } = this;
    const endTime = new Date(startTime.getTime() + temporaryDuration);
    const event = calendar.createEvent(title, startTime, endTime);
    return event.getId();
  }
  /**
   * @param {string} id ID of event to close
   * @param {Date} endTime Event's start time
   */
  endEvent(id, endTime) {
    const { calendar } = this;
    const event = calendar.getEventById(id);
    const startTime = event.getStartTime();
    event.setTime(startTime, endTime);
  }
}
exports.MyCalendar = MyCalendar;

const { MyCalendar } = require("./MyCalendar");
const { MyRecord } = require("./MyRecord");
const { MySheet } = require("./MySheet");
const CALENDAR_NAME = "Outing";
const SHEET_NAME = "Log";

function doPost(e) {
  const rawData = e.postData.getDataAsString();
  const {
    id: place,
    timestamp,
    trigger,
  } = rawData.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});
  const eventDate = new Date(timestamp * 1000);
  const calendar = new MyCalendar(CALENDAR_NAME);
  if (trigger === "enter") {
    const eventId = calendar.startEvent(place, eventDate);
    const newRecord = new MyRecord(eventId, place, eventDate, trigger, rawData);
    const sheet = new MySheet(SHEET_NAME);
    sheet.unshiftRecords(newRecord);
    return;
  }
  const sheet = new MySheet(SHEET_NAME);
  const previousRecord = sheet.getPreviousRecordByPlace(place);
  if (previousRecord === undefined) {
    throw new ReferenceError("`previousRecord` is undefined!");
  }
  const eventId = previousRecord.id;
  calendar.endEvent(eventId, eventDate);
  const newRecord = new MyRecord(eventId, place, eventDate, trigger, rawData);
  sheet.unshiftRecords(newRecord);
  return;
}

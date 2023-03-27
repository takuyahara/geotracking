const { TrackingCalendar } = require("./TrackingCalendar");
const { TrackingRecord } = require("./TrackingRecord");
const { TrackingInvert } = require("./TrackingInvert");
const { TrackingLog } = require("./TrackingLog");
const CALENDAR_NAME = "Outing";
const SHEET_NAME_LOG = "Log";
const SHEET_NAME_INVERT = "Invert";

function doPost(e) {
  const rawData = e.postData.getDataAsString();
  const {
    id: place,
    timestamp,
    trigger: triggerTemp,
  } = rawData.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});
  const eventDate = new Date(timestamp * 1000);
  const calendar = new TrackingCalendar(CALENDAR_NAME);
  const trackingInvert = new TrackingInvert(SHEET_NAME_INVERT);
  const isInverted = trackingInvert.placeExists(place);
  const trigger = isInverted
    ? triggerTemp === "enter"
      ? "exit"
      : "enter"
    : triggerTemp;
  if (trigger === "enter") {
    const eventId = calendar.startEvent(place, eventDate);
    const newRecord = new TrackingRecord(
      eventId,
      place,
      eventDate,
      trigger,
      rawData
    );
    const sheet = new TrackingLog(SHEET_NAME_LOG);
    sheet.unshiftRecords(newRecord);
    return;
  }
  const sheetLog = new TrackingLog(SHEET_NAME_LOG);
  const previousRecord = sheetLog.getPreviousRecordByPlace(place);
  if (previousRecord === undefined) {
    const newRecord = new TrackingRecord(
      "N/A",
      place,
      eventDate,
      trigger,
      rawData
    );
    sheetLog.unshiftRecords(newRecord);
    return;
  }
  const eventId = previousRecord.id;
  calendar.endEvent(eventId, eventDate);
  const newRecord = new TrackingRecord(
    eventId,
    place,
    eventDate,
    trigger,
    rawData
  );
  sheetLog.unshiftRecords(newRecord);
  return;
}

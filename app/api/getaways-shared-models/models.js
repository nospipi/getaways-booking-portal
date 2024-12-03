const { model } = require("mongoose");

//-----------------------------------------------------------------

const fileSchema = require("./schemas/fileSchema");
const userSchema = require("./schemas/userSchema");
const vehicleSchema = require("./schemas/vehicleSchema");
const announcementSchema = require("./schemas/announcementSchema");
const taskSchema = require("./schemas/taskSchema");
const userDayScheduleSchema = require("./schemas/userDayScheduleSchema");
const bugReportSchema = require("./schemas/bugReportSchema");
const appVersionSchema = require("./schemas/appVersionSchema");
const groupSchema = require("./schemas/groupSchema");
const roleSchema = require("./schemas/roleSchema");
const requestSchema = require("./schemas/requestSchema");
const productsSchema = require("./schemas/productsSchema");
const bookingSchema = require("./schemas/bookingSchema");
const tourGroupSchema = require("./schemas/tourGroupSchema");
const channelsSchema = require("./schemas/channelsSchema");
const meetingPointSchema = require("./schemas/meetingPointSchema");
const noteSchema = require("./schemas/noteSchema");
const calendarNoteSchema = require("./schemas/calendarNoteSchema");
const notificationSchema = require("./schemas/notificationSchema");
const PwaPushSubscriptionSchema = require("./schemas/PwaPushSubscriptionSchema");
const g4sTrackingSessionCredentialsSchema = require("./schemas/g4sTrackingSessionCredentialsSchema");
const portalUserSessionSchema = require("./schemas/portalUserSessionSchema");
const vehicleServiceLogEntrySchema = require("./schemas/vehicleServiceLogEntrySchema");
const bokunDataSchema = require("./schemas/bokunDataSchema");
const messageDraftSchema = require("./schemas/messageDraftSchema");
const ticketsAvailabilitySchema = require("./schemas/ticketsAvailabilitySchema");
const availabilityToolVisitorSchema = require("./schemas/availabilityToolVisitorSchema");

//----------------------------------------------------------------------------

const FileModel = model("file", fileSchema);
const UserModel = model("user", userSchema);
const VehicleModel = model("vehicle", vehicleSchema);
const AnnouncementModel = model("announcement", announcementSchema);
const TaskModel = model("task", taskSchema);
const UserDayScheduleModel = model("user_day_schedule", userDayScheduleSchema);
const BugReportModel = model("bug_report", bugReportSchema);
const AppVersionModel = model("app_version", appVersionSchema);
const GroupModel = model("group", groupSchema);
const RoleModel = model("role", roleSchema);
const RequestModel = model("request", requestSchema);
const ProductsModel = model("products", productsSchema);
const BookingModel = model("booking", bookingSchema);
const TourGroupModel = model("tour_group", tourGroupSchema);
const ChannelModel = model("channel", channelsSchema);
const MeetingPointModel = model("meeting_point", meetingPointSchema);
const NoteModel = model("note", noteSchema);
const CalendarNoteModel = model("calendar_note", calendarNoteSchema);
const NotificationModel = model("notification", notificationSchema);
const PwaPushSubscriptionModel = model(
  "pwa_push_subscription",
  PwaPushSubscriptionSchema
);
const G4STrackingSessionCredentialsModel = model(
  "g4s_tracking_session_credentials",
  g4sTrackingSessionCredentialsSchema
);

const PortalUserSessionModel = model(
  "portal_user_session",
  portalUserSessionSchema
);

const VehicleServiceLogEntryModel = model(
  "vehicle_service_log_entry",
  vehicleServiceLogEntrySchema
);
const BokunDataModel = model("bokun_data", bokunDataSchema);
const MessageDraftModel = model("message_draft", messageDraftSchema);
const TicketsAvailabilityModel = model(
  "tickets_availability",
  ticketsAvailabilitySchema
);
const AvailabilityToolVisitorModel = model(
  "availability_tool_visitor",
  availabilityToolVisitorSchema
);

//----------------------------------------------------------------------------

module.exports = {
  FileModel,
  UserModel,
  VehicleModel,
  AnnouncementModel,
  TaskModel,
  UserDayScheduleModel,
  BugReportModel,
  AppVersionModel,
  GroupModel,
  RoleModel,
  RequestModel,
  ProductsModel,
  BookingModel,
  TourGroupModel,
  ChannelModel,
  MeetingPointModel,
  NoteModel,
  CalendarNoteModel,
  NotificationModel,
  PwaPushSubscriptionModel,
  G4STrackingSessionCredentialsModel,
  PortalUserSessionModel,
  VehicleServiceLogEntryModel,
  BokunDataModel,
  MessageDraftModel,
  TicketsAvailabilityModel,
  AvailabilityToolVisitorModel,
};

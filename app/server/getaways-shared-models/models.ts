import { model, models } from "mongoose";

const REFRESH_ONLINE_SESSIONS_URL = process.env
  .REFRESH_ONLINE_SESSIONS_URL as string;
// const REFRESH_ONLINE_SESSIONS_URL =
//   "http://localhost:3000/api/booking_portal_sessions/refresh_online_sessions";

//-----------------------------------------------------------------

import fileSchema from "./schemas/fileSchema";
import userSchema from "./schemas/userSchema";
import vehicleSchema from "./schemas/vehicleSchema";
import announcementSchema from "./schemas/announcementSchema";
import taskSchema from "./schemas/taskSchema";
import userDayScheduleSchema from "./schemas/userDayScheduleSchema";
import bugReportSchema from "./schemas/bugReportSchema";
import appVersionSchema from "./schemas/appVersionSchema";
import groupSchema from "./schemas/groupSchema";
import roleSchema from "./schemas/roleSchema";
import requestSchema from "./schemas/requestSchema";
import productsSchema from "./schemas/productsSchema";
import bookingSchema from "./schemas/bookingSchema";
import tourGroupSchema from "./schemas/tourGroupSchema";
import channelsSchema from "./schemas/channelsSchema";
import meetingPointSchema from "./schemas/meetingPointSchema";
import noteSchema from "./schemas/noteSchema";
import calendarNoteSchema from "./schemas/calendarNoteSchema";
import notificationSchema from "./schemas/notificationSchema";
import PwaPushSubscriptionSchema from "./schemas/PwaPushSubscriptionSchema";
import g4sTrackingSessionCredentialsSchema from "./schemas/g4sTrackingSessionCredentialsSchema";
import portalUserSessionSchema from "./schemas/portalUserSessionSchema";
import portalSessionSchema from "./schemas/portalSessionSchema";
import portalOpenSessionSchema from "./schemas/portalOpenSessionSchema";
import vehicleServiceLogEntrySchema from "./schemas/vehicleServiceLogEntrySchema";
import bokunDataSchema from "./schemas/bokunDataSchema";
import messageDraftSchema from "./schemas/messageDraftSchema";
import ticketsAvailabilitySchema from "./schemas/ticketsAvailabilitySchema";
import availabilityToolVisitorSchema from "./schemas/availabilityToolVisitorSchema";

//----------------------------------------------------------------------------

export const FileModel = models.file || model("file", fileSchema);
export const UserModel = models.user || model("user", userSchema);
export const VehicleModel = models.vehicle || model("vehicle", vehicleSchema);
export const AnnouncementModel =
  models.announcement || model("announcement", announcementSchema);
export const TaskModel = models.task || model("task", taskSchema);
export const UserDayScheduleModel =
  models.user_day_schedule || model("user_day_schedule", userDayScheduleSchema);
export const BugReportModel =
  models.bug_report || model("bug_report", bugReportSchema);
export const AppVersionModel =
  models.app_version || model("app_version", appVersionSchema);
export const GroupModel = models.group || model("group", groupSchema);
export const RoleModel = models.role || model("role", roleSchema);
export const RequestModel = models.request || model("request", requestSchema);
export const ProductsModel =
  models.products || model("products", productsSchema);
export const BookingModel = models.booking || model("booking", bookingSchema);
export const TourGroupModel =
  models.tour_group || model("tour_group", tourGroupSchema);
export const ChannelModel = models.channel || model("channel", channelsSchema);
export const MeetingPointModel =
  models.meeting_point || model("meeting_point", meetingPointSchema);
export const NoteModel = models.note || model("note", noteSchema);
export const CalendarNoteModel =
  models.calendar_note || model("calendar_note", calendarNoteSchema);
export const NotificationModel =
  models.notification || model("notification", notificationSchema);
export const PwaPushSubscriptionModel =
  models.pwa_push_subscription ||
  model("pwa_push_subscription", PwaPushSubscriptionSchema);
export const G4STrackingSessionCredentialsModel =
  models.g4s_tracking_session_credentials ||
  model(
    "g4s_tracking_session_credentials",
    g4sTrackingSessionCredentialsSchema
  );
export const PortalUserSessionModel =
  models.portal_user_session ||
  model("portal_user_session", portalUserSessionSchema);
export const PortalSessionModel =
  models.portal_session || model("portal_session", portalSessionSchema);
//-----------------------------------------------------------------
export const PortalOpenSessionModel =
  models.portal_open_session ||
  model("portal_open_session", portalOpenSessionSchema);
const portalOpenSessionChangeStream = PortalOpenSessionModel.watch();
portalOpenSessionChangeStream.on("change", async () => {
  // console.log("OPEN SESSION CHANGE DETECTED", change.operationType);
  // if (change.operationType === "delete") {
  //   console.log("OPEN SESSION DELETED");
  //   const doc = await PortalOpenSessionModel.findById(change.documentKey._id);
  //   await addUserAction(doc.booking_ref, null, "PAGE_LEAVE");
  // }
  await fetch(REFRESH_ONLINE_SESSIONS_URL);
});
//-----------------------------------------------------------------
export const VehicleServiceLogEntryModel =
  models.vehicle_service_log_entry ||
  model("vehicle_service_log_entry", vehicleServiceLogEntrySchema);
export const BokunDataModel =
  models.bokun_data || model("bokun_data", bokunDataSchema);
export const MessageDraftModel =
  models.message_draft || model("message_draft", messageDraftSchema);
export const TicketsAvailabilityModel =
  models.tickets_availability ||
  model("tickets_availability", ticketsAvailabilitySchema);
export const AvailabilityToolVisitorModel =
  models.availability_tool_visitor ||
  model("availability_tool_visitor", availabilityToolVisitorSchema);

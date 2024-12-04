"use server";
import {
  BookingModel,
  ProductsModel,
  TourGroupModel,
  TaskModel,
  VehicleModel,
  UserModel,
  PortalUserSessionModel,
} from "@/app/api/getaways-shared-models/models";
import connectDB from "@/app/api/db.connect";

//-----------------------------------------------------------------------------

export const getBooking = async (id: string): Promise<unknown> => {
  await connectDB();

  const booking = await BookingModel.findById(id).select([
    "_id",
    "ref",
    "client_name",
    "date",
    "product_id",
    "option_id",
    "tickets",
    "pickup_location",
    "client_location",
    "pickup_time",
    "client_response_status",
  ]);
  const product = await ProductsModel.findById(booking.product_id);
  const tourGroup = await TourGroupModel.findById(booking.tour_group_id);
  const task =
    tourGroup?.task_id && (await TaskModel.findById(tourGroup?.task_id));
  const coordinates = task?.pickups?.map((pickup) => ({
    latitude: pickup.lat,
    longitude: pickup.lon,
  }));
  const taskAssignees = [];
  if (task?.assignees.length > 0) {
    for (const assignee of task.assignees) {
      const assigneeData = await UserModel.findById(assignee?.user_id);
      taskAssignees.push(assigneeData.name.split(" ")[0]);
    }
  }
  const vehicle = await VehicleModel.findById(task?.vehicle_id);
  const previousVisit = await PortalUserSessionModel.findOne({
    booking_ref: booking.ref,
  });

  return {
    ...booking.toObject(),
    product,
    isFirstVisit: !previousVisit,
    task: {
      _id: task?._id,
      assignees: taskAssignees,
      vehicle: vehicle,
      meetingPointCoordinates: coordinates,
    },
  };
};

export default getBooking;
//------------------------------------------------------------------------------

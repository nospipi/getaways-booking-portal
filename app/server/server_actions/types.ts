export interface IServerActionReturn<T = unknown> {
  status: "success" | "error";
  message: string;
  data?: T; // Generic type for data, defaults to a generic object
}

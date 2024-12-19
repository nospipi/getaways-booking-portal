export interface IServerActionReturn<T = { [key: string]: unknown }> {
  status: "success" | "error";
  message: string;
  data?: T; // Generic type for data, defaults to a generic object
}

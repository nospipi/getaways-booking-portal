export interface IServerActionReturn {
  status: "success" | "error";
  message: string;
  data?: { [key: string]: unknown };
}

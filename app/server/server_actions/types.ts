export interface IServerActionReturn {
  status: "success" | "error";
  message: string;
  data?: unknown;
}

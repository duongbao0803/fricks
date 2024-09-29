import { ErrorResponse } from "@/types/login.types";

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (error as ErrorResponse).data !== undefined;
}

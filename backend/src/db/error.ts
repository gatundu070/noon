import { AppError } from "../errors/app-error.js";

export class DatabaseError extends AppError {
  constructor(params: Omit<AppError, "name">) {
    super({ ...params, name: "DatabaseError" });
  }
}

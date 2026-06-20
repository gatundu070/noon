export interface AppErrorI {
  name: string;
  message: string;
  statusCode: number;
  isOperational: boolean;
  cause?: unknown;
}

export class AppError extends Error implements AppErrorI {
  public statusCode: number;
  public isOperational: boolean;

  constructor(params: AppErrorI) {
    const { name, message, statusCode, isOperational, cause } = params;
    super(message, { cause });

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

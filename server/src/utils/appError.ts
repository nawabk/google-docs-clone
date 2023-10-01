class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  message: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
  }
}

export default AppError;

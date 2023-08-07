class AppError extends Error {
  statusCode: string;
  isOperational: boolean;
  constructor(statusCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
  }
}

export default AppError;

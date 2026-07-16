class CustomError extends Error {
  constructor(type = "InternalServerError", msg = "Something went wrong") {
    super(msg);
    this.name = type;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;

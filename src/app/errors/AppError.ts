class AppError extends Error {
  public satus_code: number;

  constructor(satus_code: number, message: string, stack = '') {
    super(message);
    this.satus_code = satus_code;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;

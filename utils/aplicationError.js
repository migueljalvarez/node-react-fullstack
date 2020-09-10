class AplicationError extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(error, status, origin) {
    // Calling parent constructor of base Error class.
    super(error.message)

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)

    // `400` is the default value if not specified.
    this.status = status || 400
    this.message = error
    if (error.code) this.errorCode = error.code
  }
}

export default AplicationError

class CustomError extends Error {
  constructor (message) {
    super(message)

    this.name = this.constructor.name
    this.message = message

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
  }
}

class ValidationError extends CustomError {
  constructor (message) {
    super(message)
    this.status = 400
  }
}

class UnauthorizedError extends CustomError {
  constructor (message) {
    super(message)
    this.status = 401
  }
}

class NotFoundError extends CustomError {
  constructor (message) {
    super(message)
    this.status = 404
  }
}

const errorMiddleware = (error, req, res, next) => {
  console.error(error)

  const responseConfig = error instanceof CustomError
    ? { status: error.status, message: error.message }
    : { status: 500, message: 'Erro desconhecido. Por favor, tente novamente mais tarde.' }

  return res
    .status(responseConfig.status)
    .send({ error: responseConfig.message })
}

process.on('uncaughtException', error => {
  console.error('Uncaught exception: ', error)
})

export {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  errorMiddleware,
}

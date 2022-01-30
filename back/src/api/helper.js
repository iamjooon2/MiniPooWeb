
module.exports = {
  sendErrorResponse: (res, error, statusCode, message) => {
    const resBody = {
      error: JSON.parse(JSON.stringify(error)),
      message: message,
    }
    res.status(statusCode)
    res.send(resBody)
    console.error(statusCode, resBody)
  }
}
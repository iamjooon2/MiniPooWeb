
module.exports = {
  sendErrorResponse: (res, e, statusCode, message) => {
    const resBody = {
      error: e.toString(),
      message: message,
    }
    res.status(statusCode)
    res.send(resBody)
    console.error(e, resBody)
  }
}
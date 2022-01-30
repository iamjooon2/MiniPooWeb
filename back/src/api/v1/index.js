const express = require('express')
const authAPI = require("api/v1/auth")


module.exports = (serviceDB) => {
  const auth = authAPI(serviceDB)

  const router = express.Router()
  router.use("/auth", auth)
  return router
}
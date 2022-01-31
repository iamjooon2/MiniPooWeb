const uuid = require('uuid')
const { formatISO, addDays } = require('date-fns')
class SessionRepository {
  serviceDB

  constructor(serivceDB) {
    this.serviceDB = serivceDB
  }

  deleteAnyway = (token) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection(async (err, conn) => {
      try {
        if(err) {
          reject(err)
          return
        }
        await conn.promise().execute("DELETE FROM sessions WHERE token = ?", [token])
      } catch (e) {
        reject({
          error: e,
          message: "server internal error",
        })
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })

  insertAnyway = (userInfo) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection(async (err, conn) => {
      try {
        if(err) {
          reject(err)
          return
        }
        // prepared statement를 사용하는건, SQLInjection attack 해킹을 최소화 하기 위함
        await conn.promise().execute("DELETE FROM sessions WHERE user_id = ?", [userInfo.id])
        const sessionToken = uuid.v4()

        await conn.promise().execute(
          "INSERT INTO sessions(token, user_id, data, expiry_at) VALUES(?, ?, ?, ?)",
          [sessionToken, userInfo.id, JSON.stringify(userInfo), formatISO(addDays(new Date(), 30))],
        )
        const [rows] = await conn.promise().execute("SELECT * FROM sessions WHERE token = ?", [sessionToken])
        resolve(rows[0])
      } catch (e) {
        reject({
          error: e,
          message: "server internal error",
        })
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })
}

module.exports = SessionRepository
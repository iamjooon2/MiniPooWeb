

class UserRepository {
  serviceDB

  constructor(serivceDB) {
    this.serviceDB = serivceDB
  }

  findUserByUsernameAndPassword = (username, password) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection((err, conn) => {
      try {
        if(err) {
          this.serviceDB.releaseConnection(conn)
          reject(err)
          return
        }
        // prepared statement를 사용하는건, SQLInjection attack 해킹을 최소화 하기 위함
        conn.execute("SELECT * FROM users WHERE username = ? AND password ?", [username, password], (err, rows) => {
          if(err) {
            reject(err)
            return
          }

          if(rows.size === 0) {
            resolve({})
          } else if(rows.size === 1) {
            resolve(rows[0])
          }
          reject({
            message: "rows is more than 1",
            rows: rows,
          })
        })
      } catch (e) {
        reject({
          error: e,
          message: "server internal error",
          rows: rows,
        })
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })
}

module.exports = UserRepository
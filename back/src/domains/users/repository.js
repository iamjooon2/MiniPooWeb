

class UserRepository {
  serviceDB

  constructor(serivceDB) {
    this.serviceDB = serivceDB
  }

  findUserByUsernameAndPassword = (username, password) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection((err, conn) => {
      try {
        if(err) {
          reject(err)
          return
        }
        // prepared statement를 사용하는건, SQLInjection attack 해킹을 최소화 하기 위함
        conn.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, rows) => {
          if(err) {
            reject(err)
            return
          }
          if(rows.length === 0) {
            resolve(undefined)
          } else if(rows.length === 1) {
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
        })
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })

  insertUser = (username, password) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection(async (err, conn) => {
      try {
        if(err) {
          reject(err)
          return
        } 
        let [ affectedRow ] = await conn.promise().execute('INSERT INTO users(username, password) VALUES(?, ?)', [username, password])
        const id = affectedRow.insertId
        let [ rows ] = await conn.promise().execute('SELECT * FROM users WHERE id = ?', [id])
        const userInfo = rows[0]
        resolve(userInfo)
      } catch(e) {
        reject(e)
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })
}

module.exports = UserRepository
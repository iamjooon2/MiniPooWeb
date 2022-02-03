

class PostRepository {
  serviceDB

  constructor(serivceDB) {
    this.serviceDB = serivceDB
  }

  findPostsByUserid = (user_id) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection((err, conn) => {
      try {
        if(err) {
          reject(err)
          return
        }
        conn.execute("SELECT * FROM posts WHERE user_id = ?", [user_id], (err, rows) => {
          if(err) {
            reject(err)
            return
          }
          if(rows.length === 0) {
            resolve(undefined)
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

  insertPost = (user_id, title, content) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection(async (err, conn) => {
      try {
        if(err) {
          reject(err)
          return
        }
        let [ affectedRow ] = await conn.promise().execute('INSERT INTO posts(user_id, title, content) VALUES(?, ?, ?)', [user_id, title, content])
        const id = affectedRow.insertId
        let [ rows ] = await conn.promise().execute('SELECT * FROM posts WHERE id = ?', [id])
        const postList = rows;
        resolve(postList)
      } catch(e) {
        reject(e)
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })
}

module.exports = PostRepository
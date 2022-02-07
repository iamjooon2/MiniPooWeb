

class PostRepository {
  serviceDB

  constructor(serivceDB) {
    this.serviceDB = serivceDB
  }

  findPostsByUserid = (user_id) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection((err, conn) => {
      const Query = `SELECT * FROM posts WHERE user_id = ?`
      try {
        if(err) {
          reject(err)
          return
        }
        conn.execute(Query, [user_id], (err, rows) => {
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
      const Query = `INSERT INTO posts(user_id, title, content) VALUES(?,?,?)`
      try {
        if(err) {
          reject(err)
          return
        }
        let [ affectedRow ] = await conn.promise().execute(Query , [user_id, title, content])
        const id = affectedRow.insertId
        let [ rows ] = await conn.promise().execute('SELECT * FROM posts WHERE id = ?', [id])
        const postId = rows[0].id
        resolve(postId)
      } catch(e) {
        reject(e)
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })

  deletePost = (user_id, id) => new Promise((resolve, reject) => {
    this.serviceDB.getConnection(async (err, conn) => {
      const Query = `DELETE FROM posts WHERE user_id = ? and id = ?`;
      try {
        if (err){
          reject(err)
          return
        }
        let [ affectedRow ] = await conn.promise().execute(Query , [user_id, id])
        const selectedId = affectedRow.insertId
        let [ rows ] = await conn.promise().execute('SELECT * FROM posts WHERE id = ? and STATUS = DELETED', [selectedId])
        const deletedPostId = rows[0].id
        resolve(deletedPostId)
      } catch(e) {
        reject(e)
      } finally {
        this.serviceDB.releaseConnection(conn)
      }
    })
  })

}

module.exports = PostRepository
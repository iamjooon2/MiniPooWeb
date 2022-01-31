const fs = require('fs')
const serviceDB = require('adapters/servicedb')

const drop = async () => {
  try {
    const fileSQL = await fs.readFileSync('src/adapters/servicedb/drop.sql', { encoding: 'utf8' })

    fileSQL.split(';').forEach((sql) => {
      if (sql.indexOf('DROP') !== -1) {
        serviceDB.connection.execute(sql, (err) => {
          if(err) {
            throw err
          }
        })
      }
    })
  } catch(e) {
    console.error(e)
  }
}

drop()
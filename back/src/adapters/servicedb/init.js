const fs = require('fs')
const serviceDB = require('adapters/servicedb')

const init = async () => {
  try {
    const fileSQL = await fs.readFileSync('src/adapters/servicedb/init.sql', { encoding: 'utf8' })

    fileSQL.split(';').forEach((sql) => {
      if (sql.indexOf('CREATE') !== -1) {
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

init()
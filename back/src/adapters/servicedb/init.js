const fs = require('fs')
const serviceDB = require('adapters/servicedb')

const init = async () => {
  try {
    const fileSQL = await fs.readFileSync('src/adapters/servicedb/init.sql', { encoding: 'utf8' })

    const splits = fileSQL.split(';')
    for (let i = 0; i < splits.length; i += 1) {
      const sql = splits[i]
      if (sql.indexOf('CREATE') !== -1) {
        const [res] = await serviceDB.connection.promise().execute(sql)
        console.info(sql)
        console.log(res)
      }
    }
  } catch(e) {
    console.error(e)
  } finally{
    process.exit(0)
  }
}

init()

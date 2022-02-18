const fs = require('fs')
const serviceDB = require('adapters/servicedb')

const drop = async () => {
  try {
    const fileSQL = await fs.readFileSync('src/adapters/servicedb/drop.sql', { encoding: 'utf8' })

    const splits = fileSQL.split(';')
    for (let i = 0; i < splits.length; i += 1) {
      const sql = splits[i]
      if (sql.indexOf('DROP') !== -1) {
        const [ res, err ] = await serviceDB.connection.promise().execute(sql)
        console.info(sql)
        console.log(res)
      }
    }
  } catch(e) {
    console.error(e)
  } finally {
    process.exit(0) 
    //process.exit(0) -> 정상적으로 종료되었음을 알림(0을 리턴)
    //process.exit(1) -> 문제가 있으면 1을 리턴하도록 한다
  }
}

drop()
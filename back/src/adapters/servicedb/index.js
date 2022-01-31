const serviceDB = require('config/db')
const mysql = require('mysql2');


const pool = mysql.createPool({
  // 내가 썼던
  // createConnection => 단일 연결 방식으로, 요청이 있을 때마다 연결 객체를 생성했다가, 제거하는 것이 반복
  // createPool => 미리 정해진 갯수의 연결을 생성 후 Request가 발생하면 해당 Req에 연결을 할당하고 다시 반납
  ...serviceDB,

  charset: 'utf8mb4', // utf8mb4 를 해야 native emojif 를 저장할 수 있음 😄 <- 요딴거
  insecureAuth: true,
  supportBigNumbers: true,
  bigNumberStrings: true,
  // debug: process.env.NODE_ENV !== "production",
  // trace: process.env.NODE_ENV !== "production",
  // 위 두줄은 어떻게 데이터 넘어가나 확인시 중요
  multipleStatements: true,

  // ----- connection pool 옵션 .. 이건 나중에 중고급 개발자가 되면 아래 옵션이 중요해짐

  /**
   * The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10 seconds)
   */
   connectTimeout: 10 * 1000,

  /**
  * Determines the pool's action when no connections are available and the limit has been reached. If true, the pool will queue
  * the connection request and call it when one becomes available. If false, the pool will immediately call back with an error.
  * (Default: true)
  */
  waitForConnections: true,

  /**
  * The maximum number of connections to create at once. (Default: 10)
  */
  connectionLimit: 5,

  /**
  * The maximum number of connection requests the pool will queue before returning an error from getConnection. If set to 0, there
  * is no limit to the number of queued connection requests. (Default: 0)
  */
  queueLimit: 1,

  /**
  * Enable keep-alive on the socket.  It's disabled by default, but the
  * user can enable it and supply an initial delay.
  */
  enableKeepAlive: true,

  /**
  * If keep-alive is enabled users can supply an initial delay.
  */
  keepAliveInitialDelay: 5,
})

const connection = mysql.createConnection({
  ...serviceDB,
})

const initMigration = () => {
  connection()
}

module.exports = {
  pool,
  connection,
  initMigration,
};
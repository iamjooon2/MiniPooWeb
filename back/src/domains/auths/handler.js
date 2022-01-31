const UserRepository = require('domains/users/repository')
const SessionRepository = require('domains/sessions/repository')
class AuthHandler {
  userRepository
  sessionRepository

  constructor(serviceDB) {
    this.userRepository = new UserRepository(serviceDB)
    this.sessionRepository = new SessionRepository(serviceDB)
  }

  login = async ({username, password}) => {
    try {
      let userInfo = await this.userRepository.findUserByUsernameAndPassword(username, password)
      if (!userInfo || userInfo.status === 'DELETED') {
        userInfo = await this.userRepository.insertUser(username, password)
      }

      if (userInfo && userInfo.status === 'ACTIVE') {
        const sessData = await this.sessionRepository.insertAnyway(userInfo)
        return sessData
      }

      return userInfo
    } catch (e) {
      throw e
    }
  }

  logout = async(token) => {
    try {
      await this.sessionRepository.deleteAnyway(token)
    } catch (e) {
      throw e
    }
  }
}

module.exports = AuthHandler
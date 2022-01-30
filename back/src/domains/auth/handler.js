const UserRepository = require('domains/user/repository')

class AuthHandler {
  userRepository
  constructor(serviceDB) {
    this.userRepository = new UserRepository(serviceDB)
  }

  login = async ({username, password}) => {
    try {
      const userInfo = await this.userRepository.findUserByUsernameAndPassword(username, password)
      return userInfo
    } catch (e) {
      throw new Error(e.toString())
    }
  }

}

module.exports = AuthHandler
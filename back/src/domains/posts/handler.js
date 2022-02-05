const PostRepository = require('domains/posts/repository')

class PostHandler {
  postRepository

  constructor(serviceDB) {
    this.postRepository = new PostRepository(serviceDB)
  }

  upload = async ({user_id, title, content}) => {
    try {
      let postInfo = await this.postRepository.insertPost(user_id, title, content)
      return postInfo
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  delete = async ({}) => {
    try {
      let postInfo = await this.postRepository.findPost(user_id, title, content)
      return postInfo
    } catch(e) {
      console.log(e)
      throw e
    }


  }

}

module.exports = PostHandler
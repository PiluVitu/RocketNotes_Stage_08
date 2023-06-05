const sqLiteConnection = require('../database/sqLite')
class UserRepository {
  async findByEmail() {
    const database = await sqLiteConnection()
    const user = await database.get('SELECT * FROM users WHERE email = (?)', [email])
    return user
  }

  async create({ name, email, password }) {
    const database = await sqLiteConnection()
    const userId = await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    )

    return {
      id: userId
    }
  }
}

module.exports = UserRepository

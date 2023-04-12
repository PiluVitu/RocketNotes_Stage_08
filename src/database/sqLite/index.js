const sqlite3 = require('sqlite3')
const sqLite = require('sqlite')
const path = require('path')

async function sqLiteConnection() {
  const dataBase = await sqLite.open({
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
  })

  return dataBase
}

module.exports = sqLiteConnection

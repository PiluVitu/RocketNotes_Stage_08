require('express-async-errors')
const migrationsRun = require('./database/sqLite/migrations')
const AppError = require('./utils/AppError')

const express = require('express')
const app = express()

const routes = require('./routes')
migrationsRun()

app.use(express.json())
app.use(routes)

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)
  return res.status(500).json({
    message: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333

app.listen(PORT, () => {
  console.log('App está rodando na porta:' + PORT)
})

require('express-async-errors')
require('dotenv')
const migrationsRun = require('./database/sqLite/migrations')
const uploadConfig = require('./configs/upload')
const AppError = require('./utils/AppError')
const cors = require('cors')

const corsOptions = {
  origin:'https://rocketnotes.piluvitu.dev/',
  optionsSuccessStatus: 200
}

const express = require('express')
const app = express()

app.use((req,res,next)=> {
  res.header("Access-Control-Allow-Origin","https://rocketnotes.piluvitu.dev")
  next()
})

app.use(cors(corsOptions))

const routes = require('./routes')
const { UPLOADS_FOLDER } = require('./configs/upload')
migrationsRun()

app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('App está rodando na porta:' + PORT)
})

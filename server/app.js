import express from 'express'
import { contactsRouter } from './src/routes/contactsRouter.js'
import morgan from 'morgan'
import cors from 'cors'

const server = express()

const PORT = 3050

server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.use('/api/v1/contacts', contactsRouter)

server.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})

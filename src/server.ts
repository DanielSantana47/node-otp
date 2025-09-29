import express, { urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { mainRouter } from './routes'

const server = express()
server.use(helmet())
server.use(cors())
server.use(urlencoded({extended: true}))
server.use(express.json())

server.use(mainRouter)

const port = process.env.PORT || 4747
server.listen(port, ()=> {
    console.log("server running on port http://localhost:" + port)
})
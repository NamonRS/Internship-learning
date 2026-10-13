import http from 'node:http'
import path from 'node:path'
import {handleGet} from './handlers/routeHandlers.js'
import { serveStatic } from './public/utils/serveStatic.js'


const PORT = 8000

const __dirname = import.meta.dirname



const server = http.createServer(async (req, res) => {
    if (req.url === '/api'){
        if (req.method === 'GET'){
            return await handleGet(res)
        }
    }
    else if (req.method === 'POST'){
        handlePost(req,res)
    }
    else if (!req.url.startsWith('/api')){
    return await serveStatic(req, res, (__dirname,'public'))
}
}) 

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`))

import http from 'node:http'
import path from 'node:path'
import {serveStatic} from './public/utils/serveStatic.js'
import fs from 'node:fs/promises'
import { getContentType } from './public/utils/getContentType.js'
const PORT =8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req,res)=>{
    const publicDir =path.join(__dirname, 'public')
    const pathToResource = path.join(
        publicDir,
    req.url === '/' ? 'index.html' : req.url)

     
    const ext =path.extname(pathToResource)



    
    try {
            const content = await fs.readFile(pathToResource)
            const ContentType =getContentType(ext)

            res.statusCode = 200
            res.setHeader('Content-Type', ContentType)
            res.end(content)
        } catch (error) {
            console.log(`Resource path error at: ${pathToResource}`)
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end('<h1>404 Not Found</h1>')
        }
    })

    
server.listen(PORT,()=> console.log(`Server running on PORT: ${PORT}`))
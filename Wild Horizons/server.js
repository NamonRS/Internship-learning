import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import {sendJSONResponse} from './utils/sendJSONResponse.js'
import { getDataFromPathParms } from './utils/getDataByPathParms.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'
const PORT = 8000

const server=http.createServer(async (req, res) =>{
    const destinations = await getDataFromDB()

    const urlobj= new URL(req.url,`http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlobj.searchParams)
    console.log(queryObj) 

    if(urlobj.pathname === '/api' && req.method === 'GET'){
        let filteredData=getDataByQueryParams(destinations,queryObj)
        console.log(queryObj)
    sendJSONResponse(res,200,filteredData)
    }

else if(req.url.startsWith('/api/continent') && req.method === 'GET'){
    const continent =req.url.split('/').pop()
    const filteredData=getDataFromPathParms(destinations,'continent',continent)
   
    sendJSONResponse(res,200,filteredData)   
}
else if (req.url.startsWith('/api/country') && req.method ==='GET'){
    const country=req.url.split('/').pop()
    const filteredData=getDataFromPathParms(destinations,'country',country)
    sendJSONResponse(res,200,filteredData)
}

else {
        sendJSONResponse(res,404,
            ({error:"notFound",
             message:"The requested route doesnot exist"
            })
        )
}
})

server.listen(PORT, ()=> console.log(`Connected on PORT: ${PORT}`))
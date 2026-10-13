import {getData} from '../public/utils/getData.js'
import { sendResponse } from '../public/utils/sendResponse.js'
export async function handleGet(res){
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res,200,'application/json',content)
}
export function handlePost(req,res){
    console.log('recerived POST req')
}
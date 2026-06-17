import 'dotenv/config'
import app from "./server.js";
import mongodb from "mongodb";
// import ReviewsDAO from "./dao/reviewsDAO.js" // DAO= Data Acess Object sepreates data acces client from data interfaces

const MongoClient= mongodb.MongoClient;
const mongo_username= process.env['MONGO_USERNAME'];
const mongo_password= process.env['MONGO_PASSWORD'];
const uri=`mongodb+srv://${mongo_username}:${mongo_password}@nrs4373.3myztp4.mongodb.net/moviereviews?appName=NRS4373`

const port = 8000;
MongoClient.connect(uri)
.catch(err => {
    console.error(err.stack); // console.error special type of console.log for errors
    process.exit(1); // Fancy way of ending the program. process

})
.then(async client => {   // first connect (then) do the asnc function. async function runs at same time as other simultaneously
    app.listen(port, () =>{
        console.log(`listening on port ${port}`)
    })
})   

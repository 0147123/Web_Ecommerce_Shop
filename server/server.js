import bodyParser from 'body-parser'
import cors from 'cors'
import express from "express"
import http from "http"
import https from "https"
import fs from "fs"


// import routes
import postRoutes from './routes/itemslist.js'
import categoryRoutes from './routes/category.js'
import itemRoutes from './routes/item.js'
import userRoutes from './routes/user.js'

const app = express()
const divPort = 8080
const port = 8000

app.use(bodyParser.json({ limit: "1mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }))
app.use(cors())

app.use('/itemslist', postRoutes)
app.use('/category', categoryRoutes)
app.use('/item', itemRoutes)
app.use('/user', userRoutes)


// for port 80
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

var httpServer = http.createServer(app);

// for local port 8080
httpServer.listen(divPort, () => {
  console.log(`Example app listening on port ${divPort}`)
})

var httpsServer = https.createServer({
  key: fs.readFileSync('./forSSL/secure.s69.ierg4210.ie.cuhk.edu.hk.key'),
  cert: fs.readFileSync('./forSSL/secure_s69_ierg4210_ie_cuhk_edu_hk.crt')
}, app);

httpsServer.listen(8000, () => {
  console.log(`HTTPS Server running on port ${8000}`);
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// include express
// const express = require('express')
// init express

// const path = require("path")

// var sqlite3db = sqlite3.verbose();
// // var db = new sqlite3.Database( path.join(__dirname,"../cart.db") );
// var db = new sqlite3db.Database( path.join(__dirname,"./cart.db") , () => console.log("sussess to connect db"), (err) =>{
//   if(err == null){
//     res.send(rows)
//   }else{
//     res.send(err)
//   }
// });




// app.get("/getitem", (req, res) => {
//   db.all("select * from 'CATEGORIES'", [], (err, rows) =>{
//     if(err == null){
//       res.send(rows);
//     }else{
//       console.log(err)
//     }
//   })
// })



// app.use(express.json())

// app.use(function (req, res, next) {
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin", "*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers", "content-type");
//   //跨域允许的请求方式
//   res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
//   if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
//   else next();
// });

// app.use("/db", require("./router/dbrouter"))


// //get请求接口
// app.post("/test", function (req, res) {
//   console.log(req.query)
//   console.log(req.body)
//   res.send(req.body);
// });



// app.use((req, res, next) => {
//   console.log('LOGGED')
//   req.requestTime = Date.now()
//   // do other action
//   next()
// })

// // this can be middleware
// app.all('*', (req, res, next) => {
//   console.log('Accessing the secret section ...')
//   next() // pass control to the next handler
// })


// app.get('/', (req, res) => {
//   // req == request (from client side to server, and from frontend)
//   // res == response (from server to client)
//   // res.send('Hello World!')
//   res.status(404).send()
// })

// app.post('/', (req, res) => {
//   res.send('Got a POST request')
// })



// app.get('/user', (req, res) => {
//   res.send('Got a GET request at /user')
// })

// app.delete('/user', (req, res) => {
//   res.send('Got a DELETE request at /user')
// })


// app.put('/user', (req, res) => {
//   res.send('Got a PUT request at /user')
// })

// // This route path will match acd and abcd.
// // app.get('/ab?cd', (req, res) => {
// //   res.send('ab?cd')
// // })


// // This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
// app.get('/ab*', (req, res) => {
//   res.send('ab*\n' + req.requestTime)
// })




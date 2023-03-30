// setting
// "start": "nodemon server.js"
//   "type": "module",
// "test": "echo \"Error: no test specified\" && exit 1"

import express from "express"
import { getitemsList, deleteItems, updateItems, createItems, createItemsImage, updatedItemimage, getitemsListByPage, getitemsListOnlyText } from "../services/services.js"
import multer from "multer"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid';
import * as mine from 'mime-types';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../image"))
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() +'.' + mine.extension(file.mimetype) )
  }
})
var upload = multer({storage: storage,
                     limits: { fieldSize: '5MB' }})
var type = upload.single("image")

// file need to go to localhost:8080/posts first
// here, the path is localhost:8080/posts
router.get('/', getitemsList)
router.get('/text', getitemsListOnlyText)
router.get('/bypage/:page', getitemsListByPage)
router.post('/', createItems)
router.delete('/:id', deleteItems)
router.patch('/', updateItems)
router.post('/createimage', type, createItemsImage)
router.post('/updateimage', type, updatedItemimage)


export default router

// // const express = require("express")
// const fs = require("fs")
// const path = require("path")
// var router = express.Router()

// var sqlite3 = require("sqlite3").verbose();
// var db = new sqlite3.Database( path.join(__dirname,"../cart.db") , () => console.log("server is connected to db"), (err, rows) =>{
//   if(err == null){
//     res.send(rows)
//   }else{
//     res.send(err)
//   }
// });


// router.get("/getitem", (req, res) => {
//   db.all("select * from 'CATEGORIES'", [], (err, rows) =>{
//     if(err == null){
//       res.send(rows);
//   }else{
//       res.send(err)
//   }
//   })
// })

// module.exports = router;

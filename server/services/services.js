import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs'
import * as mine from 'mime-types';
import gm from "gm";
import { send } from 'process';
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// open db
var sqlite3db = sqlite3.verbose();
// var db = new sqlite3.Database( path.join(__dirname,"../cart.db") );
var db = new sqlite3db.Database( path.join(__dirname,"../cart.db") , () => console.log("sussess to connect db"), (err, rows) =>{
  if(err == null){
    res.send(rows)
  }else{
    res.send(err)
  } 
});

// async function of sqlite3 db.all
async function db_all(query, params){
  return new Promise(function(resolve,reject){
      db.all(query, params, (err,rows) =>{
         if(err){return reject(err);}
         resolve(rows);
      });
  });
}

// async function of sqlite3 db.run
async function db_run(query, params){
  return new Promise(function(resolve, reject){
      db.all(query, params, (err) => {
         if(err){return reject(err);}
         resolve();
      });
  });
}

// change image size
// for (let i = 1;i <=33 ;i++){
//   let sql = `UPDATE 'PRODUCTS' SET IMGLESS = ? 
//              WHERE PID = ?`

//   try {
//     await db_run(sql, [`../image/${i}/small/resize1.png`, i])
//   } catch (error) {
//     console.log(error)
//   }
// }

async function cateAndSubcategory(req, res){

  console.log(path.join(__dirname,"../cart.db"))
  let outputarray = []
  await db.all(`SELECT SCID AS scid, a.CID AS cid, a.NAME AS category, b.NAME AS subcategory 
                FROM 'CATEGORIES' a, 'SUBCATEGORIES' b 
                WHERE a.CID = b.CID`, [], (err, rows) =>{
    if(err == null){
      outputarray.push(rows.map((item) => {
        !item.category ? item.category = "" : item.category = item.category
        !item.subcategory ? item.subcategory = "" : item.subcategory = item.subcategory
        console.log(item)
        return item
      }))
    }else{
      res.send(err)
    }
  })
  
  await db.all(`SELECT CID AS cid, NAME AS name 
                FROM 'CATEGORIES'`, [], (err, rows) =>{
    if(err == null){
      outputarray.push(rows.map((item) => {
        !item.name ? item.name = "" : item.name = item.name
        console.log(item)
        return item
      }))
      // console.log("outputarray", outputarray)
      res.send(outputarray)
    }else{
      res.send(err)
    }
  })
}



// category and subcategory

export const getCateAndSubcategory = async (req, res) => {
  await cateAndSubcategory(req, res)
}

// category
export const createCates = async (req, res) => {
  const post = req.body
  console.log("createCates start")
  console.log(post)
  let sql = `INSERT INTO 'CATEGORIES' (CID, NAME) VALUES (NULL, ?);`
  try {
    // insert item
    await db_run(sql, [post.name])
    await cateAndSubcategory(req, res)
  } catch (error) {
    res.status(409).send(error.message)
  }
}

export const deleteCate = async (req, res) => {
  const { id } = req.params;
  console.log("deleteCate start")

  let setCidNullSQL = `UPDATE 'SUBCATEGORIES' SET CID = NULL 
                    WHERE CID = ?;`
  // set null cid for subcategory that belong to this category
  try {
    await db_run(setCidNullSQL, [id])
  } catch (error) {
    console.log(error)
  }

  // check the items is exist
  await db.all(`SELECT CID AS id
                FROM 'CATEGORIES'
                WHERE CID = ?`, [id], (err, rows) =>{
    if(err == null && rows.length != 0){
      // delete cate
      db.run(`DELETE 
              FROM 'CATEGORIES' 
              WHERE CID = ?`, [parseInt(id)], (err) =>{
        if (err == null) {
          res.json({message: 'item: ' + id + ' is successfully delete'})
        } else {
          res.status(404).send(err)
        }
      })
    }
    else{
      res.status(404).send(err+ " or not exist this entry")
    }
  })
}

export const updateCates = async (req, res) => {
  // the total array
  const post = req.body[0]
  // the the update cid
  const update = req.body[1]

  console.log("this is updateCates post", req.body)

  console.log("this is updateCates post and update", post, update)

  if (update.length == 0 ) {
    try {
      await cateAndSubcategory(req, res)
    } catch (error) {
      console.log(error)
    }
    return
  }

  console.log("updateCates start")
  let sql = `UPDATE 'CATEGORIES'
             SET NAME = ?
             WHERE CID = ?;`

  try {

    // for (let k of update) {
    //   await db_run(sql, [post[k-1].name, post[k-1].cid])
    //   console.log("testing ")
    // }
    update?.forEach(async cid => {
      await db_run(sql, [post[cid-1].name, post[cid-1].cid])
      console.log("testing ")
    });
  
    // update item
    // await db_run(sql, [post.name, post.cid])

    // return the updated item
    await cateAndSubcategory(req, res)
  
  } catch (error) {
    console.log(error)
  }

  console.log("updateCates end")
}

// subcategory
export const deleteSubCate = async (req, res) => {
  const { id } = req.params;
  console.log("")
  // check the items is exist
  await db.all(`SELECT SCID AS id 
                FROM 'SUBCATEGORIES' 
                WHERE SCID = ?`, [id], (err, rows) =>{
    if(err == null && rows.length != 0){
      db.run(`DELETE 
              FROM 'SUBCATEGORIES' 
              WHERE SCID = ?`, [parseInt(id)], (err) =>{
        if (err == null) {
          res.json({message: 'item: ' + id + ' is successfully delete'})
        } else {
          res.status(404).send(err)
        }
      })
    }
    else{
      res.status(404).send(err+ " or not exist this entry")
    }
  })

}

export const updateSubCates = async (req, res) => {
  // the total array
  const post = req.body[0]
  // the the update cid
  const update = req.body[1]  
  // const post = req.body

  console.log("update", update)
  console.log("post", post)
  console.log("type of update", typeof update)

  if (update.length == 0 ) {
    await cateAndSubcategory(req, res)
    return
  }

  console.log("updateCates start")

  let sql = `UPDATE 'SUBCATEGORIES'
             SET CID = ?, NAME = ?
             WHERE SCID = ?;`

  try {
    // for (let key of update) {
    //   console.log("key", key)
    //   await db_run(sql, [post[key-1].cid, post[key-1].name, post[key-1].scid])
    //   console.log("testing ")
    // }
    update?.forEach(async scid => {
      await db_run(sql, [post[scid-1].cid, post[scid-1].subcategory, post[scid-1].scid])
      console.log("testing ")
    })
    // update item
    // await db.run(sql, [post.cid, post.name, post.scid])
    // console.log("testing ")


    // return the updated item
    await cateAndSubcategory(req, res)
  
  } catch (error) {
    console.log(error)
  }

  console.log("updateCates end")
}

export const createSubCates = async (req, res) => {
  const post = req.body
  let sql = `INSERT INTO 'SUBCATEGORIES' (SCID, CID, NAME) 
             VALUES (NULL, ?, ?);`

  try {
    await db_run(sql, [post.cid, post.name])

    res.send("successfully create")
  } catch (error) {
    console.log(error)
  }
  console.log(post)
  console.log("\createSubCates end")
}






// product

var selectProductSQL = `SELECT PID AS id, a.NAME AS name, IMG AS img, PRICE AS price, QUANTITY AS quantity, DESCRIPTION AS description, 
                        b.NAME AS subCategory, c.NAME AS category, b.SCID AS scid, a.IMGTYPE as imgtype
                        FROM 'PRODUCTS' a, 'SUBCATEGORIES' b, 'CATEGORIES' c 
                        WHERE PID = ? AND a.SCID = b.SCID AND b.CID = c.CID`


const uploadImage = async (pid, file) => {
  var newdir = path.join(__dirname,`../image/${pid}/`)
  var newCompdir = path.join(__dirname,`../image/${pid}/small/`)
  console.log(newdir, "newdir")

  // check if ../image/{pid} have file
  // delete file if it have
  if (!fs.existsSync(newdir)){
    fs.mkdirSync(newdir, { recursive: true });
  } else {
    // for (const file of await fs.promises.readdir(newdir)) {
    //   console.log("remove file", path.join(newdir, file))
    //   await fs.promises.unlink(path.join(newdir, file))
    // }
    fs.rmSync(newdir, { recursive: true, force: true });
  }

  // move uploaded file to image/{pid}
  var oldPath = file.path
  var newPath = path.join(newdir, file.filename)

  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
    console.log('Successfully Moved File')
  })



  // input the image to new item or update image
  let sql = `UPDATE 'PRODUCTS'
             SET IMG = ?, IMGTYPE = ?, IMGLESS = ?
             WHERE PID = ?`

  console.log("resize")
  fs.mkdirSync(newCompdir, { recursive: true });
     
  try {
    gm(newPath)
      .resize(200)
      .write(`./image/${pid}/small/resize1.png`, function (err) {
        if (!err) console.log('done');
        console.log(err)
      });
  

    await db_run(sql, [`../image/${pid}/${file.filename}`, mine.extension(file.mimetype), `../image/${pid}/small/resize1.png`, pid])
    console.log("success to upload image")

    
    let row = await db_all(selectProductSQL, [pid])
    return row
  } catch (err) {
    console.log(err)
  }
}

export const getitemsListOnlyText = async (req, res) => {
  let sql = `SELECT PID AS id, a.NAME AS name, PRICE AS price, QUANTITY AS quantity, DESCRIPTION AS description , 
             b.NAME AS subCategory, c.NAME AS category, b.SCID AS scid , b.CID as cid
             FROM 'PRODUCTS' a, 'SUBCATEGORIES' b, 'CATEGORIES' c 
             WHERE a.SCID = b.SCID AND b.CID = c.CID `

  db.all(sql, [], (err, rows) =>{
  if(err == null){      
    res.send(rows);
  }else{
    res.send(err)
  }
})
          
}

export const getitemsList = async (req, res) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  let sql = `SELECT PID AS id, a.NAME AS name, IMG AS img, PRICE AS price, QUANTITY AS quantity, DESCRIPTION AS description , 
             b.NAME AS subCategory, c.NAME AS category, b.SCID AS scid , b.CID as cid, IMGTYPE as imgtype, IMGLESS as imgless
             FROM 'PRODUCTS' a, 'SUBCATEGORIES' b, 'CATEGORIES' c 
             WHERE a.SCID = b.SCID AND b.CID = c.CID `

  db.all(sql, [], (err, rows) =>{
    if(err == null){      
      let sendback = rows.map((item) => {
        if (item.imgless === 'undefined' || !item.imgless) return item
        let bitmap = fs.readFileSync(path.join(__dirname, item.imgless), 'base64')
        return {...item, img : bitmap}
      })
      // console.log(sendback)
      res.send(sendback);
    }else{
      res.send(err)
    }
  })
}

export const getitems = async (req, res) => {
  const { id } = req.params

  try {
    let rows = await db_all(selectProductSQL, [id])

    console.log(rows)

    if (rows[0].img === 'undefined' || !rows[0].img){
      res.send(rows)
      return
    }
    let bitmap = fs.readFileSync(path.join(__dirname, rows[0].img), 'base64')
    rows[0].img = bitmap
    res.send(rows[0])
  } catch (error) {
    console.log(error)
  }
}


export const getitemsListByPage = async (req, res) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  let countItemSql = `SELECT COUNT(*) AS count FROM 'PRODUCTS'`

  let sql = `SELECT PID AS id, a.NAME AS name, IMG AS img, PRICE AS price, QUANTITY AS quantity, DESCRIPTION AS description , 
             b.NAME AS subCategory, c.NAME AS category, b.SCID AS scid , b.CID as cid, IMGTYPE as imgtype
             FROM 'PRODUCTS' a, 'SUBCATEGORIES' b, 'CATEGORIES' c 
             WHERE a.SCID = b.SCID AND b.CID = c.CID
             LIMIT 16 OFFSET 16 * (? -1) ; ` // from 10*(page #-1) , take 20 records

  let { page } = req.params
  console.log(page)
  // check if page number is valid
  let rows = await db_all(countItemSql, [])
  let { count } = rows[0]
  
  // if page number is invalid, send back no more
  if (16 * (page - 1) > count - 1) {
    console.log("no more item")
    res.send([{hasMore : false}, ])
    return
  }

  // need change to async await
  db.all(sql, [page], (err, rows) =>{
    if(err == null){      
      // send back image as base64
      console.log("this is rows", rows)
      let sendback = rows.map((item) => {
        if (item.img === 'undefined') return item
        let bitmap = fs.readFileSync(path.join(__dirname, item.img), 'base64')
        return {...item, img : bitmap}
      })

      // console.log(sendback)
      res.send([{hasMore : true}, sendback]);
    }else{
      res.send(err)
    }
  })
}



export const createItems = async (req, res) => {
  const post = req.body
  console.log("\ncreateItems start")
  try {
    await db_run(`INSERT INTO 'PRODUCTS' (PID, NAME, IMG, PRICE, SCID, QUANTITY, DESCRIPTION) VALUES (NULL, ?, ?, ?, ?, ?, ?)`, 
      [post.name, post.img, post.price, post.scid , post.quantity, post.description])

    let newpidSQL = `SELECT MAX(PID) as pid FROM 'PRODUCTS'`
    let pid = await db_all(newpidSQL, [])  
    console.log("pid", pid[0].pid)
    let rows = await db_all(selectProductSQL, [pid[0].pid])
    res.send(rows)
  } catch (error) {
    console.log(error)
  }
  console.log(post)
  console.log("\ncreateItems end")
}

export const deleteItems = async (req, res) => {
  const { id } = req.params;
  console.log("")
  // check the items is exist
  await db.all(`SELECT PID AS id 
                FROM 'PRODUCTS' 
                WHERE PID = ?`, [id], (err, rows) =>{
    if(err == null && rows.length != 0){
      db.run(`DELETE 
              FROM 'PRODUCTS'
              WHERE PID = ?`, [parseInt(id)], (err, rows) =>{
        if (err == null) {
          res.json({message: 'item: ' + id + ' is successfully delete'})
        } else {
          res.status(404).send(err)
        }
      })
    }
    else{
      res.status(404).send(err+ " or not exist this entry")
    }
  })

}

export const updateItems = async (req, res) => {
  const post = req.body

  console.log("updateitem start")

  let sql = `UPDATE 'PRODUCTS'
             SET NAME = ?, PRICE = ?, SCID = ?, QUANTITY = ?, DESCRIPTION = ?
             WHERE PID = ?;`

  // let testingInsertImage = `INSERT INTO 'UserImages' ()`

  try {
    await db.run(sql, [post.name, post.price, post.scid , post.quantity, post.description, post.id])
    console.log("testing ")

    let rows = await db_all(selectProductSQL, [post.id])
    res.json(rows)

  } catch (error) {
    console.log(err)
  }

  console.log("updateitem end")
}


export const createItemsImage = async (req, res) => {
  let { pid } = req.body
  const file = req.file

  if (!file){
    res.send("nofile")
    return
  }

  console.log("uploadItemsImage start")

  // for new project
  if (pid === undefined || pid == 'undefined'){
    console.log("this is in the loop")
    let newpidSQL = `SELECT MAX(PID) as pid FROM 'PRODUCTS'`
    try {
      let rows = await db_all(newpidSQL, [])

      pid = rows[0].pid.toString()
    } catch (err) {
      console.log(err)
    }
  }

  let row = await uploadImage(pid, file)

  console.log(row)
  console.log("uploadItemsImage end")
  return row ? res.send(row) : res.send('this is fail') 
}

export const updatedItemimage = async (req, res) => {
  let { pid } = req.body
  const file = req.file

  console.log("uploadItemsImage start")

  if (!file){
    res.send("nofile")
    return
  }

  let row = await uploadImage(pid, file)

  console.log(row)
  console.log("uploadItemsImage end")
  return row ? res.send(row) : res.send('this is fail') 
}


export const login = async (req, res) => {
  let { email, password } = req.body
  console.log("login start")

  let sql = `SELECT PASSWORD AS password
             FROM 'USER'
             WHERE EMAIL = ?`
  try {
    let rows = await db_all(sql, [email])
    if (rows.length == 0){
      res.send("wrong email")
      return
    }
    let { password: hash } = rows[0]
    let isMatch = await bcrypt.compare(password, hash)
    if (isMatch){
      res.send("success")
    }else{
      res.send("wrong password")
    }
  } catch (error) {
    console.log(error)
  }  
}
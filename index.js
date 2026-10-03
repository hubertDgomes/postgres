import { Client } from "pg";
import express from 'express'

const app = express()

app.use(express.json())



const con = new Client({
    host : "localhost",
    port : 5432,
    user : "postgres",
    password : "hubert",
    database : "newtest"
})


con.connect()
.then(()=> console.log("The DB is connected"))
.catch((e) => console.log(e.message))

app.get('/' , (req , res)=> {
    res.json({message : "The server is working"})
})

app.post('/post' , (req , res) => {
    const {no , name } = req.body

    const insert_query = "insert into newtest (no , name) values ($1 , $2)"
    con.query(insert_query,[no , name],(err , result) => {
        if(err){
            res.send(err)
        }
        else{
            console.log(result)
            res.send("Done hoiche!")
        }
    })
})

app.listen(3000,()=> {
    console.log("The server is connected and the DB is working!")
})
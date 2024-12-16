const express = require('express');
const r = require('rethinkdb');
const app = express();
const cors = require('cors');//sunuc{unun çalışması için
const {v4: uuidv4} =require('uuid');
let connect;
app.use(cors());


const bodyParser = require("body-parser");
app.use(express.json());//body den gelen verileri çekmek için

r.connect({
    host: 'localhost',
    port: 28015,
    db: 'Todos'
}, (err, conn) => {
    if (err) {
        console.error('veri tabanına bağlanmadı', err);
        return;
    }
    connect = conn;
    console.log('rethinkdb bağlandı');
});

app.get('/todos',(req,res) =>{
    r.table('sa').run(connect,(err,cursor)=>{
        if(err){
        }
        cursor.toArray((err,data)=>{
            res.json(data);
        })
    })
})


app.post('/todos', (req, res) => {
    let id=uuidv4();
    const {info} = req.body;
     r.table("sa").insert({ "info":info,"id":id}).run(connect, (err, result) => {
        if (err) {
            return console.log("eklenmedi");
        }
        res.json({ success: true});
    });
});

app.delete('/todos/:id',(req,res) =>{
    
    const {id} =req.params
    
   console.log(id)
    r.table("sa").filter({"id": id}).delete().run(connect, (err,result) =>{
        if(err){
           return  console.log("silinmedi")
        }
        res.json({success:true})
    })
    
})
app.put('/todos/:id',(req,res)=>{
    const {id} =req.params
    const {newinfo}=req.body
    r.table("sa").filter({"id": id}).update({"info": newinfo}).run(connect , (err,result) =>{
        if(err){
            return console.log("veri değişmedi")
        }
        res.json({success:true})
    })
})

app.listen(3000);









const express = require('express')
const route = express.Router()
const Users=require("../model/model")
const controller = require('../controller/controller')                                        
route.get("/",controller.homepage)

route.get("/addUser",controller.addUser)
 
route.post('/api/users/',controller.create)

route.get('/api/users/delete/:id',controller.delete)

route.post('/api/users/:id',async(req,res)=>{ 
    console.log("hello world")
    if(!req.body){
       res.status(400).send({message:"data to be update cannot empty"})

    }
    const id = req.params.id;
     console.log(req.body)
     await Users.findByIdAndUpdate(id,req.body)
     res.status(200).redirect('/')
})
route.get("/api/users/:id",async(req,res)=>{
    let id =req.params.id
    await Users.findById(id)
    .then(data=>{
        if(!data){
            res.status(400).send("error")
        }
        else{
            res.status(200).render("update_user",{users:data})
        }
    })
})


module.exports= route 
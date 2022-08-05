const res = require('express/lib/response')
var Userdb = require('../model/model')

exports.create = async(req,resp)=>{
  
        if(!req.body){
            resp.status(400).send({message:'body cannot be empty'})
        }
      
        const {name,email,gender,status}=req.body
        console.log(req.body.name)
    
        const user =await new Userdb({
            name,email,gender,status
        }).save()   
        resp.status(200).redirect("/")
    }
exports.find = (req,resp)=>{

    if(req.query.id){
        const id = req.query.id
        Userdb.findById(id)
         .then(user =>{
             resp.send(user)
         })
         .catch(err => {
             resp.status(500).send({message:err.message || 'error occurred'})
         })
       
    } else{

        Userdb.find()
        .then(user => {
            resp.send(user)
        })
        .catch(err =>{
            resp.status(500).send({message:err.message || "error occurred while finding user"})
        })
   }
   }
   exports.delete=(req,res)=>{
       const id=req.params.id;
       console.log(id)
    
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"id is not match"})
        }else{
            res.status(200).redirect("/")
        }
    }).catch(err=>{
        res.status(500).send({message:"user not deleted"})
    })
}
exports.addUser=(req,res)=>{
    res.render("add_user")
}

exports.homepage=(req,res)=>{
    Userdb.find()
    .then(data=>{
        if(!data){
            res.status(400).send("error")
        }
        else{
            res.status(200).render("index",{users:data})
        }
    })
}
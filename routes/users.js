const express = require('express'); 
routes = express.Router();
const users = require ('../data/usersData')

let userId = 5 ;

routes.route('/')
   .get((req,res) => {
    res.status(200).json(users)
   })
   .post((req,res,next)=> {
    if(req.body.email && req.body.username && req.body.password) {
      const user = users.find(user => user.email == req.body.email)
      if (user) return res.status(400).json("email already exist")
      const newUser = {
         id : userId ,    
         name:req.body.name,
         username:req.body.username,
         email : req.body.email,
         password : req.body.password,
     }
     users.push(newUser)
     userId++;  
     return res.status(201).json(newUser)
    }
    next()
   })



routes.route('/:id') 
   .get((req,res,next)=> {
      const  user =  users.find(user => user.id == req.params.id) ; 
      if(user) return  res.status(200).json(user);
      next();   
   })
   .patch((req,res,next) => {
      if(req.body.name && req.body.email && req.body.username){
         const  user =  users.find((user,index) => { 
            if(user.id == req.params.id) {
                  for(const key in req.body)  {
                    users[index][key] = req.body[key]
                  }
                  return true; 
            }
         }) ; 
         if(user) return res.status(201).json(user)
         else next()
      } 
      next(); 
   })   
   .delete((req,res,next) => {
        const user = users.find((user, index) => {
         if(user.id == req.params.id) {
           users.splice(index,1);
           return true;
         }
        })
        if(user) return  res.status(200).json(user)
        next()
   })



module.exports = routes ; 

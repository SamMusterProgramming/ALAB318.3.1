const express = require('express'); 
routes = express.Router();
const users = require ('../data/usersData')

routes.route('/')
   .get((req,res) => {
    res.status(200).json(users)
   })
   .post((req,res)=> {
    
   })



routes.route('/:id') 
   .get((req,res,next)=> {
      const  user =  users.find(user => user.id == req.params.id) ; 
      if(user) return  res.status(200).json(user);
      next();   
   })
   .patch((req,res,next) => {
      
   })   
   .delete((req,res,next) => {
        
   })
// middleware function to handle error
routes.use((req,res) =>{
   res.status(404).json({ error: "Resource Not Found" });
})


module.exports = routes ; 

const express = require('express'); 
routes = express.Router();
const users = require ('../data/usersData')

routes.route('/')
   .get((req,res) => {
    res.status(200).json(users)
   })
   .post((req,res)=> {
    console.log('add user here')
   })
let user = {} ; 
routes.route('/:id') 
   .get(authUserId,(req,res)=> {
    return  res.status(200).json(user)
   })
   .patch(authUserId,(req,res) => {

   })   
   .delete(authUserId,(req,res) => {
        
   })

function authUserId(req,res,next) {
    console.log('i am here')
    user =  users.find(user => user.id == req.params.id) ; 
    if(!user) return  res.status(404).json(`can't find user`);
    next();   
}


module.exports = routes ; 

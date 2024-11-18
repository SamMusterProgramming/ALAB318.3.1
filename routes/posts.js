const express = require('express'); 
routes = express.Router();
const posts = require ('../data/postsData')


let postId = 5;


routes.route('/')
    .get((req,res)=> {
       res.status(200).json(posts)
     })
    .post((req,res,next)=> {
        console.log(req.body.user_id)
       if(req.body.user_id && req.body.image_url)  {
        const newPost = {
            id: postId,
            user_id : req.body.user_id,
            image_url : req.body.image_url,
            desciption : "",
            date : new Date('now'),
            likes_count : 0,
            comments_id :100
        }

        posts.push(newPost)
        postId++;
        return res.status(201).json(newPost)
       }
       next()
    })
     
routes.route('/:id') 
    .get((req,res,next)=> {
       const  post =  posts.find(post => post.id == req.params.id) ; 
       if(post) return  res.status(200).json(post);
       next();   
    })
    .patch((req,res,next)=> {
        const post = posts.find((post,index)=> {
            if(post.id == req.params.id) {
                for(const key in req.body) {
                    posts[index][key] = req.body[key]
                }
                return true
            }
        })
        if(post) return res.status(201).json(post)
        next()
    })
    .delete((req,res)=> {
       const post = posts.find((post,index)=>{
        if(post.id == req.params.id) {
            posts.splice(index,1)
            return true
        }
       })
       if(post) return res.status(200).json(post)
       next()
    })

     
     
module.exports = routes;
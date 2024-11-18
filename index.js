const express = require('express')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const users = require('./data/usersData')
const posts = require('./data/postsData')
const bodyParser = require("body-parser");


const app = express();
const PORT = 8080 ; 

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
   
app.use('/api/users' , usersRouter)
app.use('/api/posts', postsRouter)

app.get('/', (req,res)=> {
    res.send(`welcome to user's posts`)
}) 




// merge users and posts to display them in one list as json object
app.get('/api', (req,res)=> {
        return  res.status(200).json(usersPosts(users,posts))
}) 
 
 
function usersPosts(users,posts) {
    let data = [] ; 
    users.forEach(user => {
         const userPosts = posts.filter(post => post.user_id == user.id) ; 
         data.push({...user,...{["posts"]:[...userPosts]} })
    }); 
    return data ; 
}
   
 
// to handle error 404
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });


// middleware that handle errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json( { error: err.message } );
  });

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
  }

app.listen(PORT, () => {
    console.log('listenning on port' + PORT)
})
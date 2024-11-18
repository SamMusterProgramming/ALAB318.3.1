const express = require('express')
const usersRouter = require('./routes/users')
const users = require('./data/usersData')
const posts = require('./data/posts.Data')
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080 ; 

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
   
app.use('/api/users' , usersRouter)


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
   
   
app.listen(PORT, () => {
    console.log('listenning on port' + PORT)
})
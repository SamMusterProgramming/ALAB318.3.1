const express = require('express')
const usersRouter = require('./routes/users')
const app = express();
const PORT = 3000 ; 

app.use(express.json())


app.use('/users' , usersRouter)

app.get('/', (req,res)=> {
    res.send('hello world')
})


app.listen(PORT, ()=> {
    console.log('listenning on port' + PORT)
})
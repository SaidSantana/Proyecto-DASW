"use strict"

const express = require('express');
//const router = require('./Temps/router')
const loginRouter = require('./Temps/login_router')
const userRouter = require('./Temps/User_Router')
const playRouter = require('./Temps/play_router')
const homeRouter = require('./Temps/home_router')
const createRouter = require('./Temps/create_router')

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.setHeader('Access-Control-Allow-Headers', '*')
    next(); 
})
//app.use('/api/users', router)
app.use(createRouter)
app.use(homeRouter)
app.use(loginRouter)
app.use(playRouter)
app.use(userRouter)





app.use(cors ({
    origin: ['http://127.0.0.1:3000']
}))

app.get('/',
    (req, res) => res.send(JSON.parse("Si se pudo"))
)




app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});




const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { use } = require('../../Server/Temps/home_router');

let mongoDB ='mongodb://127.0.0.1:27017/EjemploDB';
let options = {useNewUrlParser:true, useUnifiedTopology: true}

mongoose.connect(mongoDB, options);
let privatekey = 'ABC123#'

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    token: String,

    role: {
        type: String,
        enum : ['ADMIN', 'USER'],
        required: true
    }
    
    });

//Encriptar 

userSchema.pre('save', function(next){
    let user = this
    user.pass = bcrypt.hashSync(user.pass, 10)
    next()
})


//Generar Token

userSchema.methods.generateToken = function(pass){
    let user = this
    let payload = {email: user.email}
    let options = {expiresIn: 60 * 60}

    //console.log(bcrypt.compareSync(pass, user.pass))
    if(bcrypt.compareSync(pass, user.pass)){
        try{
            user.token = jwt.sign(payload, privatekey, options)
            //console.log(user.token)
            return user.token
        } catch(err) {
            console.log(err)
        }
    }

    //else console.log("no entra")

    
}

// Crear usuario
let User = mongoose.model('Usuarios', userSchema);



let newUser = {
    name: "Cornelius",
    email: "cornelius@hotMamis.com",
    pass: "FueraTata",
    imageUrl: "foto",
    gamesPlayed: 0,
    age: 30,
    role: 'USER'
    
};


module.exports = User
const mongoose = require('mongoose');
//const admin = require('../../admin2')

let mongoDB ='mongodb://127.0.0.1:27017/EjemploDB';
let options = {useNewUrlParser:true, useUnifiedTopology: true}

mongoose.connect(mongoDB, options);

let GameSchema = mongoose.Schema({
    rows: {
        type:Number
    },

    cols:{
        type:Number
    },

    title:{
        type:String
    },

    topics:{
        type:Array
    },

    questions:{
        type:Array
    },

    answers:{
        type:Array
    },
})

let Game = mongoose.model('Juegos', GameSchema)

let newGame = {
    GameId: "COlas",
    Preguntas: ["Diego", "Solorzano"]
}

//let game = Game(newGame)
/*
game.save()
.then(doc => console.log(doc))
.catch(err => console.log(err))
*/

module.exports = Game

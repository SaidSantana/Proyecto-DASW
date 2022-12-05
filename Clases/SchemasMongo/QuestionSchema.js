const mongoose = require('mongoose');

let mongoDB ='mongodb://127.0.0.1:27017/EjemploDB';
let options = {useNewUrlParser:true, useUnifiedTopology: true}

mongoose.connect(mongoDB, options);

let askSchema = mongoose.Schema({
    question: {
      type: String,
      required: true 
    },

    answer: {
      type: String,
      required: true 
    },

    category: {
      type: String,
      required: true 
    },

})

let Question = mongoose.model('Preguntas', askSchema)

let newAsk = {
    question: "Como tu te llama",
    answer: "Dietortas",
    category: "Nombres",
}

//let ask = Question(newAsk)

module.exports = Question


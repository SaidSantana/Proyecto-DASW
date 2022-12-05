/// let url = 'http://127.0.0.1:3000/create'

//JSON
let Question  = {
    question: "",
    answer: "",
    category: ""
    
    
}

//Campos
let ask = document.getElementById('PreguntaModal')
let res = document.getElementById('RespuestaModal')
let tit = document.getElementById('TopicModal')

//Boton
let pub = document.getElementById('Publish')

pub.disabled = true
ask.onkeyup = disablePregunta
res.onkeyup = disablePregunta
tit.onkeyup = disablePregunta
pub.onclick  = publishAsk

function disablePregunta() {
    if(ask.value == "" || res.value == "" || tit.value == ""){
        pub.disabled = true
    }
    else {
        pub.disabled = false
   
    }
}

function publishAsk(){
    Question.category = tit.value
    Question.answer = res.value
    Question.question = ask.value
    
    
    let jason = JSON.stringify(Question, null)
    storeQuestions(url, jason, (msg) => {
        console.log(msg)
    })

    tit.value = ""
    res.value = ""
    tit.value = ""
}



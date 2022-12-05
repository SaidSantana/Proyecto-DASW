let url = 'http://127.0.0.1:3000/play'

//Table
let scoreText = document.getElementById('Score')
let mainTable = document.getElementById('TableGame');
let tituloText = document.getElementById('titleOfGame')

//Modal
let ans = document.getElementById('campoG')
let sumbit = document.getElementById('sumbitG')

let topi = document.getElementById('topic')
let preg = document.getElementById('pregu')

ans.onkeyup = Enter
sumbit.onclick = Sumbit
scoreText.innerHTML = 0;

let score = 0

let pos = []
let cont = []

let flag

function Enter(){
    let enter
    document.addEventListener('keyup', function (e) {
        enter = e.keyCode
        if(enter == '13'){
            checkValue()
            
        }
    })
    flag = true
}

function Sumbit(){
    checkValue()
}

function checkValue(){
    loadQuestions(url).then(games => {
        //console.log(games[ran].answers)
        if(ans.value != ""){
            cont[pos[0]][pos[1]] = 1
            ans.disabled = true
        }

        if(games[ran].answers[pos[0]][pos[1]] == ans.value){
            score += (pos[0] + 1) * 100
            scoreText.innerHTML = score
            //mainTable.rows[0].style.backgroundColor='rgb(50,50,50)'
            mainTable.rows[pos[0] + 1].cells[pos[1]].style.backgroundColor='rgb(0,200,50)'
            flag = false
        }

        else if (games[ran].answers[pos[0]][pos[1]] != ans.value && flag){
            mainTable.rows[pos[0] + 1].cells[pos[1]].style.backgroundColor='rgb(200,0,50)'
        }
        
        

        //console.log(cont[0][1])
        ans.value = ""
        
        
    })

    
}

mainTable.onclick = request

function request(event){

    cell = event.target.parentElement
    if(cell.nodeName != 'TR'){
        if (cell.nodeName == 'TD'){
            preguntas(Number(cell.parentElement.firstElementChild.innerText) / 100 - 1, cell.cellIndex)
            pos[0] = Number(cell.parentElement.firstElementChild.innerText) / 100 - 1
            pos[1] =  cell.cellIndex
            
        }
    }
}

function getQuestionsGame(event){
    loadGame(url).then(games => {
        tituloText.innerHTML = games[ran].title
        //console.log(games[0].rows)
        ran = Math.floor(Math.random() * (games.length - 1))
        console.log(ran)
        //console.log(games[ran].questions[0])
        for (let i = 3; i >= games[ran].cols; i--){
            for (let j = 3; j >= 0; j--){
                mainTable.rows[j].cells[i].remove()
            }
        }
        
        for (let i = 4; i > games[ran].rows; i--){
            mainTable.rows[i].remove()
        }

        for(let i = 0; i < games[ran].cols; i++){
            let temp = new Array(games[ran].rows)
            cont.push(temp)
        }

    })
}

function preguntas(x, y){
    loadQuestions(url).then(games => {
        if(cont[x][y] != undefined)ans.disabled = true
        else ans.disabled = false
        pregu.innerHTML = games[ran].questions[x][y]
        topic.innerHTML = games[ran].topics[x]
    })
}

let aceptarJuego = document.getElementById('enlace')
aceptarJuego.onclick = function () {
    for(let i = 0; i < cont.length; i++){
        for(let j = 0; j < cont[0].length; j++){
            if(cont[i][j] != 1)return
        }
    }
    aceptarJuego.setAttribute('href', 'Home.html')
    console.log("listo")

}


getQuestionsGame()


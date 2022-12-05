//Table
let scoreText = document.getElementById('Score')
let mainTable = document.getElementById('TableGame');

//Modal
let ans = document.getElementById('campoG')
let sumbit = document.getElementById('sumbitG')

let topi = document.getElementById('topic')
let preg = document.getElementById('pregu')

ans.onkeyup = Enter
sumbit.onclick = Sumbit
scoreText.innerHTML = 0;


for (let i = 3; i > 2; i--){
    for (let j = 3; j >= 0; j--){
        mainTable.rows[j].cells[i].remove()
    }
}

for (let i = 4; i > 3; i--){
    mainTable.rows[i].remove()
}

function Enter(){
    let enter
    document.addEventListener('keyup', function (e) {
        enter = e.keyCode
        if(enter == '13')ans.value = ""
    }) 
}

function Sumbit(){
    ans.value = ""
}

mainTable.onclick = request

function request(event){
    cell = event.target.parentElement
    if(cell.nodeName != 'TR'){
        if(cell.nodeName == 'TH'){
            topi.innerHTML = cell.innerHTML
        }

        else if (cell.nodeName == 'TD')console.log(cell.cellIndex)
    }
}





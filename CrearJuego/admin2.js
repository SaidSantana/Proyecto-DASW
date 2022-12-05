'use strict';

let QL = new QuestionList()
let toExp;

let game = {
    rows: 0,
    cols: 0,
    title :"",
    topics : [], // arreglo de strings que tendrá los títulos de los temas
    questions: [],
    answers: []
}

// Aquí obten el input de titulo
let title = document.getElementById('titleInput');
// Aquí busca y guarda el elemento del botón de Generar Tablero
let btnBoard = document.getElementById('boardGenerator');
// Aquí busca y guarda el elemento del botón de Generar JSON
let btnJson = document.getElementById('jsonGenerator');
// aquí guarda la única tabla en el html (no tiene id)
let mainTable = document.getElementsByTagName('table');
// aquí guarda el botón de guardar de la ventana modal.
let btnSave = document.getElementById('btnSave');

let saveGame = document.getElementById("saveGame")
// almacenará la celda actual (cuando den clic en algún link a editar)
let cell;  // esta variable se usará después en la función de requestData()


// añade un handler a keyup para que cuando el titulo tenga texto se active el boton
//  y si no tiene que se desactive  (añade o quita la clase disabled)

// <<<


title.onkeyup = function(){
    if(isNaN(title.value))btnBoard.setAttribute('class', 'btn btn-primary');
    else btnBoard.setAttribute('class', 'btn btn-primary disabled');
}


/*
*  Aquí añadele al botón de btnBoard un handler del evento click a la función generateGameBoard
*/

 // btnBoard.on

btnBoard.onclick = generateGameBoard;

/* la función generar tablero:
*  guarda en el objeto game los valores de titulo, row y cols
*  además muestra la tabla pero oculta los renglones y columnas no necesarios
*/
function generateGameBoard(event) {
    console.log('generateGameBoard')
    // guarda en las variables title, rows, y cols los elementos correspondientes del html

    let title = document.getElementById('titleInput');
    let rows = document.getElementById('rowsInput');
    let cols = document.getElementById('colsInput');

    // muestra la tabla (propiedad hidden)
    mainTable[0].removeAttribute('hidden');
    
    // guarda el titulo en el objeto game
    game.title = title.value;
    // guarda los valores  (si rows o cols es > 4 dejala en 4 si es menor a 2 dejala en 2)
    if(rows.value > 4)rows.value = 4
    if(cols.value > 4)cols.value = 4
    if(rows.value < 2)rows.value = 2
    if(cols.value < 2)cols.value = 2
    game.cols = cols.value;
    game.rows = rows.value;
    // crea el arreglo de temas en el objeto game
    //for(let i = 0; i < cols.value; i++)game.topics.push("Tema")
    game.topics = new Array(cols.value)
    // crea la matriz de preguntas en el objeto game
    game.questions = new Array(cols.value)
    for(let i = 0; i < rows.value; i++)game.questions[i] = new Array()

    QL.question = new Array(cols.value)
    for(let i = 0; i < rows.value; i++)QL.question[i] = new Array()

    game.answers = new Array(cols.value)
    for(let i = 0; i < rows.value; i++)game.answers[i] = new Array()
    

    // oculta renglones y columnas innecesarios
    // tip: primero muestra todo (tr, td y th) puedes usar un forEach  (se puede en una línea de código)
    // selecciona los reglones usando nth-of-type(n+ algo ) y oculta
    // selecciona las columnas usando nth-of type(n+ algo ) para td y th
    
    for (let i = 4; i > cols.value; i--){
        for (let j = 4; j >= 0; j--){
            mainTable[0].rows[j].cells[i].remove()
        }
    }

    for (let i = 4; i > rows.value; i--){
        mainTable[0].rows[i].remove()
    }
    // activar botón de generateJson

    btnJson.setAttribute('class', 'btn btn-primary');
    // regresa falso o usa
    // event.preventDefault();
    // return false;

}

// Aquí asocia evento click a la función requestData(event)
// mainTable.on

mainTable[0].onclick = requestData;

// completa la función requestData(event)
function requestData(event){
    // filtrar, si no son tipo anchor Tag salirse de la función

    // actualiza la variable cell (que sea una celda tipo td o th)
    cell = event.target.parentElement
    //console.log(cell.parentElement.firstElementChild.innerText)
    // si están en un TH mostrar el modal solo la parte de la temática
    // Añade al valor el tema que se tiene guardado en el objeto

    let ask = document.getElementsByClassName("question")
    let tema = document.getElementsByClassName("theme")
    let json = document.getElementsByClassName("json")
    let ans = document.getElementById("Answer")
    let ansText = document.getElementById("RespuestaText")

    let valor = document.getElementById("modalScore")
    let topic = document.getElementById("modalTopic")

    let texto = document.getElementsByClassName("form-control")

    if(cell.nodeName == 'TH'){
        ask[0].hidden = true
        tema[0].hidden = false
        json[0].hidden = true
        btnSave.hidden = false;
        ans.hidden = true
    }

    else if(cell.nodeName == 'TD'){
        ask[0].hidden = false
        tema[0].hidden = true
        json[0].hidden = true
        btnSave.hidden = false;
        ans.hidden = false

        valor.innerText = cell.parentElement.firstElementChild.innerText
        topic.innerText =  game.topics[cell.cellIndex - 1]
        
        if(game.questions[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1] == undefined)texto[3].value = ""
        else texto[3].value =  game.questions[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1];

        if(game.answers[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1] == undefined)ansText.value = ""
        else ansText.value =  game.answers[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1];

    }

    // si están en un TD mostrar el modal solo la parte de la pregunta
    // Muestra el Tema y el valor
    // Muestra el valor de la pregunta



}

// Aquí asocia al btnJson el handler al hacer click con la función generateJson
// btnJson.on
btnJson.onclick = generateJson;

// completa la función
function generateJson(event){
    let ask = document.getElementsByClassName("question")
    let tema = document.getElementsByClassName("theme")
    let json0 = document.getElementsByClassName("json")
    let json = document.getElementById("textJson")
    let ans = document.getElementById("Answer")

    ask[0].hidden = true
    tema[0].hidden = true
    json0[0].hidden = false
    ans.hidden = true

    toExp = JSON.stringify(game, null)

    json.innerHTML = JSON.stringify(game, null)
    btnSave.hidden = true;

    return toExp;
}

// aquí asocia a btnSave
btnSave.onclick = saveData;

function saveData(event) {
    //  realiza las operaciones dependiendo en caso de pregunta o tema
    let texto = document.getElementsByClassName("form-control")
    let ans = document.getElementById("RespuestaText")
    
    if(cell.nodeName == 'TD'){
        game.questions[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1] = texto[3].value;
        texto[3].value =  game.questions[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1];
        if(texto[3].value != "")cell.style.backgroundColor='rgb(50,50,50)'

        
        game.answers[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1] = ans.value
        ans.value = game.answers[Number(cell.parentElement.firstElementChild.innerText) / 100 - 1][cell.cellIndex - 1]
    

        //Filas
        //Number(cell.parentElement.firstElementChild.innerText) / 100 - 1
        //columnas
        //cell.cellIndex - 1

        
    }
    else if(cell.nodeName == 'TH'){
        game.topics[cell.cellIndex - 1] = texto[5].value;
        cell.innerHTML = texto[5].value
        texto[5].value = "";
        
    }

    for(let i = 0; i < game.cols; i++){
        for(let j = 0; j < game.rows; j++){
            if(game.questions[i][j] === undefined || game.questions[i][j] == ""){
                saveGame.setAttribute('class', 'btn btn-primary disabled');
                return
            }
            if(game.answers[i][j] === undefined || game.answers[i][j] == ""){
                saveGame.setAttribute('class', 'btn btn-primary disabled');
                return
            }
            if(game.topics[i] === undefined || game.topics[i] == ""){
                saveGame.setAttribute('class', 'btn btn-primary disabled');
                return
            }

            saveGame.setAttribute('class', 'btn btn-primary');
            
        }
    }

    

}


saveGame.onclick = SaveGame;
let url = 'http://127.0.0.1:3000/create'
function SaveGame(){
    postGame(generateJson())
}

function postGame(game){
    storeGame(url, game, (msg) => {
        console.log(msg)
    })
}

//Terminarjuego




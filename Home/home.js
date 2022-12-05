
let url = 'http://127.0.0.1:3000/home'
let url2 = 'http://127.0.0.1:3000/home/login'
let url3 = 'http://127.0.0.1:3000/home/:email'

let campo = document.getElementById("campoPD")
let pregunta = document.getElementById("ask")
campo.onkeyup = Enter;

let usuario = {
    name: "",
    username: "",
    email: "",
    pass: "",
    imageUrl: "",
    gamesPlayed: 0,
    age: 0,
    role: 'USER'
    
};

let ans

function AskDay(){
    loadDayAsk(url).then(ask => {
        pregunta.innerText = "¿" + ask.question + "?"
        ans = ask.answer
    })
}

AskDay()

function Enter(){
    let enter
    document.addEventListener('keydown', function (e) {
        enter = e.keyCode
        if(enter == '13'){

            if(campo.value === ans){
                campo.value = "correcto"
                console.log(campo.value)
                return
            }
            
            else if(campo.value != ans && campo.value != "correcto"){
                campo.value = "incorrecto"
            }

            campo.disabled = true

        }
    }) 
}
//Inicio de user

//Campos
let correo = document.getElementById('Correo')
let pass = document.getElementById('PSW')

//Botones
let login = document.getElementById('InitSesion')

let sesion = {
    email: "",
    pass: ""
}

login.disabled = true
correo.onkeyup = disableLogin
pass.onkeyup = disableLogin

function disableLogin() {
    if(correo.value == "" || pass.value == ""){
        login.disabled = true
    }
    else {
        login.disabled = false
    }
}


login.onclick = IniciarSesion;

function IniciarSesion(){
    sesion.email = correo.value
    sesion.pass = pass.value
/*
    loadUsers(url3).then(user => {
        console.log(url3)
    })*/
    
    storeUser(url3, sesion, msg => {
        console.log(msg + " cola")
        console.log("ayuda")
    })
    //console.log("ayudaa")

    loadUsers(url + `/loged/${sesion.email}`).then(user => {
        if(user != undefined){

            usernameP.innerHTML= user.username
            edadR.innerHTML = user.age
            emailR.innerHTML = user.email
            JJ.innerHTML = user.gamesPlayed
            AD.innerHTML = user.username
        }

        else console.log("aloc")
    })


    
}





//Registro

//Campos de texto
let nombreR = document.getElementById('Nombre')
let UsernameR = document.getElementById('Username')
let Email = document.getElementById('CorreoR')
let password = document.getElementById('PSWR')
let Cpassword = document.getElementById('PSWRC')
let Edad = document.getElementById('age')

//Botones
let Registrar = document.getElementById('RegistroB')

Registrar.disabled = true
let flager

//Confirmar que todos los datos hayan sido insertados
let Campor = document.querySelectorAll("input[vaciado = 'vc']")



function disableRegister(){
    for(let i = 0; i < Campor.length; i++){
        Campor[i].onkeyup = chequeo
    }
}
function chequeo(){
    for(let i = 0; i < Campor.length; i++){
        if(Campor[i].value == ""){
            Registrar.disabled = true
            return
        }

        Registrar.disabled = false
    }
}
disableRegister()

//
Registrar.onclick = Registrarse

function Registrarse(){
    usuario.name = nombreR.value
    usuario.username = UsernameR.value
    usuario.email = Email.value
    usuario.pass = password.value
    usuario.imageUrl = "foto"
    usuario.age = Number(Edad.value)

    storeUser(url2, JSON.stringify(usuario, null), (msg) => {
        console.log(msg)
    })
}




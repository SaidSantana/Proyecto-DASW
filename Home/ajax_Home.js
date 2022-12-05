


//Only questions
async function storeQuestions(url, ask, onSuccess, onError){
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-type', 'application/json')
    //console.log([JSON.stringify(game)])
    xhr.send(ask);
    //xhr.onload = () => getXhrResponse(xhr, onSuccess, onError)
}

async function loadDayAsk(url){
    let response = await fetch(url)
    if(response.status != 200)return []
    let ask = await response.json()
    return ask
}

//Guardar Juego
function storeGame(url, game, onSuccess, onError){
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-type', 'application/json')
    //console.log([JSON.stringify(game)])
    xhr.send(game);
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError)
}

//Users
async function loadUsers(url){
    let response = await fetch(url)
    if(response.status != 200)return []
    let users = await response.json()
    return users
}

function storeUser(url, user, onSuccess, onError){
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-type', 'application/json')  
    //console.log(user)
    xhr.send(JSON.stringify(user));
    //console.log(user.age)
    //xhr.onload = () => getXhrResponse(xhr, onSuccess, onError)
}



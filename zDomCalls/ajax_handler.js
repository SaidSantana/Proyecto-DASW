
let ran = 0

async function loadGame(url){
    let response = await fetch(url)
    if(response.status != 200)return []
    let games = await response.json()
    return games
}

async function loadQuestions(url){
    let response = await fetch(url)
    if(response.status != 200)return []
    let games = await response.json()
    return games
}




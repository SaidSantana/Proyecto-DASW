const { randomInt, createSecretKey } = require("crypto")
const User = require('../SchemasMongo/UserSchema')
const Ask = require('../SchemasMongo/QuestionSchema')
const Game = require('../SchemasMongo/GameSchema')

function login(req, res){
    let email = req.body.email
    let pass = req.body.pass

    User.findOne({email: `${email}`})
        .then(user => {
            let token = user.generateToken(pass)
            console.log(user.age)
            
            if(token != undefined){
                //console.log("if")
                
                res.status(200)
                res.type('text/plain')
                res.send(user)
                return user
            }

            else {
                //console.log("else")
                res.status(403)
                res.type('text/plain')
                res.send('Mal muy mal')
            }
        })

        .catch(err => {
            //console.log("catch")
            res.status(403)
            res.type('text/plain')
            res.send('Mal muy mal')
        })

}

function getUsers(req, res){
    User.find({}).then(users => {
        res.status(200).json(users)
    })
}

function getUserByEmail(req, res) {
    let email = req.params.email

    User.findOne({ email: `${email}` }).then(user => {
        //user.generateToken()
        res.status(200).json(user)
    });
}

function createUser(req, res){
    let user = User(req.body);
    let email = user.email;
    
    User.findOne({ email: `${email}` }).then(users => {
        if(users == null){
            user.save().then((user) => {
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(`User ${user.name} was created!`);
            })
        }

        else {
            res.send(`Ese correo ya está usado`);
        }
    })

    
    
}

function updateUser(req, res) {
    let email = req.params.email;
    let updatedUser = req.body;

    for (let property in updatedUser) {
        if (['uuid','name', 'email', 'pass', 'imageUrl', 'gamesPlayed', 'age'].includes(property)) continue;
        delete updatedUser[property];
    }

    User.findOneAndUpdate({ email: `${email}` }, updatedUser, { new : true }).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(`User ${user.name} was updated!`);
    });
}

function deleteUser(req, res) {
    let email = req.params.email;

    User.findOneAndDelete({ email: `${email}` }).then(user => {
        res.type('text/plain; charset=utf-8');
        res.send(user != undefined ? `User ${user.name} was deleted!` : `No user with email ${email} was found!`);
    });
}


function getQuestions(req, res){
    Ask.find({}).then(ask => res.status(200).json(ask))
}

function getQuestionByUserId(req, res){
    let userId = req.params.userID;
    Ask.findOne({userID: `${userId}`}).then(ask => res.status(200).json(ask));
}


function getAsk(req, res){
    let preg
    Ask.find({}).then(ask => {
        let len = ask.length
        let alzar = Math.floor(Math.random() * len)


        preg = ask[alzar]
        res.status(200).json(preg)
    })

}

function createAsk(req, res){
    let ask = Ask(req.body)
    

    ask.save().then((ask) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Your Question was created!`);
    })
}
exports.createAsk = createAsk


//create game
function saveGame(req, res){

    let game = Game(req.body);

    game.save().then((que) => {
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Game was created!`);
    })

    //.catch(res.send("colaciones"))
        
   
}
exports.saveGame = saveGame


//Get Game
function getGame(req, res){
    Game.find({}).then(games => res.status(200).json(games))
}
exports.getGame = getGame

exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser
exports.getUsers = getUsers
exports.login = login
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

exports.getQuestionByUserId = getQuestionByUserId
exports.getQuestions = getQuestions



exports.getAsk = getAsk




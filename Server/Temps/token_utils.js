const jwt = require('jsonwebtoken')

let privateKey = 'ABC123#'

const verifyToken = (req, res, next) => {
    let token = req.get("x-auth")
    console.log("entraaz")
    if(token == undefined){
        res.status(403).send("Missin Token")
    }
    
    else {
        jwt.verify(token, privateKey, (err, decoded) => {
            if(err) {
                res.status(401).send("Invalid Token")
            }
    
            else {
                req.userInfo = decoded
                next()
            }
        })
    }

    
}

//let token = jwt.sign({name: "Diego", pass:"contrase"}, privateKey)
//console.log(token)

exports.verifyToken = verifyToken
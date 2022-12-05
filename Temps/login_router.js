
const router = require('express').Router()
const dataHandler = require('./data_handler')


router.route('/login')
    .post((req, res) => dataHandler.createUser(req, res))
    .get((req, res) => dataHandler.getUsers(req, res))



module.exports = router
//dataHandler.getUsers(req,res)
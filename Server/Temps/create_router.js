const router = require('express').Router()
const dataHandler = require('./data_handler')


router.route('/create')
    .get((req, res) => dataHandler.getUsers(req, res))
    .post((req, res) => dataHandler.saveGame(req, res))

module.exports = router
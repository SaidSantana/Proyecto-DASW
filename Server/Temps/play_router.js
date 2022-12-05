
const router = require('express').Router()
const dataHandler = require('./data_handler')


router.route('/play')
    .get((req, res) => dataHandler.getGame(req, res))

module.exports = router


const router = require('express').Router()
const dataHandler = require('./data_handler')


router.route('/:email')
    .get((req, res) => {
        dataHandler.getUserByEmail(req, res)
    })



module.exports = router
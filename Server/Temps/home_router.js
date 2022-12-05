
const router = require('express').Router()
const dataHandler = require('./data_handler')
const tokenUtils = require('./token_utils')



router.route('/home')
    .get((req, res) => dataHandler.getAsk(req, res))
    .post((req, res) => dataHandler.createAsk(req, res))
    
router.route('/home/login')
    .post((req, res) => dataHandler.createUser(req, res))


//router.use('/home/:email', dataHandler.login)
//router.use('/home/c/:email', tokenUtils.verifyToken)

router.route('/home/:email')
    .post((req, res) => dataHandler.login(req, res))

router.route('/home/loged/:email')
    .get((req, res) => dataHandler.getUserByEmail(req, res))





module.exports = router
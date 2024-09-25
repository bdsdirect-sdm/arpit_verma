const express = require('express');
const router = express.Router();
const practiceControllers = require('../controllers/practiceControllers');


router.post('/',practiceControllers.createUsers);
router.get('/', practiceControllers.getUsers);


module.exports = router;
    
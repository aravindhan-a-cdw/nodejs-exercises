// Imports
const { Router } = require('express');
const { buddyGetController, buddyGetAllController, buddyCreateController, buddyUpdateController, buddyDeleteController } = require('../controllers/buddy.controllers');


const router = Router();

router.get('/', buddyGetAllController);

router.get('/:id', buddyGetController);

router.post('/', buddyCreateController);

router.put('/:id', buddyUpdateController);

router.delete('/:id', buddyDeleteController);

module.exports = router;
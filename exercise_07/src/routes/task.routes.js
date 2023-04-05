const {Router} = require('express');

const {taskGetAllController, taskGetController, taskPostController, taskPutController, taskDeleteController} = require('../controllers/task.controllers');

const router = Router();

router.get('/', taskGetAllController);

router.get('/:id', taskGetController);

router.post('/', taskPostController);

router.put('/:id', taskPutController);

router.delete('/:id', taskDeleteController);

module.exports = router;


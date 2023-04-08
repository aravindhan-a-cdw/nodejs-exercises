const {Router} = require('express');
const {taskGetAllController, taskGetController, taskPostController, taskPutController, taskDeleteController} = require('../controllers/task.controllers');
const { authenticationRequired } = require('../middlewares/authentication.middlewares');
const commentRouter = require('./comment.routes');

const router = Router();

// Middleware to check if the user is authenticated before processing the request
router.use(authenticationRequired);

// Task Routes
router.get('/', taskGetAllController);
router.get('/:id', taskGetController);
router.post('/', taskPostController);
router.put('/:id', taskPutController);
router.delete('/:id', taskDeleteController);

// Task Comment Routes
router.use('/:task_id/comments', commentRouter);
// router.get('/:task_id/comments/:comment_id', getATaskComment);
// router.post('/:task_id/comments/', postTaskComment);
// router.put('/:task_id/comments/', putTaskComment);
// router.delete('/:task_id/comments/:comment_id', deleteTaskComment);


module.exports = router;


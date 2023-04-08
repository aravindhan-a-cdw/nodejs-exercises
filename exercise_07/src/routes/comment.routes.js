const {Router} = require('express');
const {getTaskComments, getATaskComment, postTaskComment, putTaskComment, deleteTaskComment} = require('../controllers/comment.controllers');

const router = Router();

// Task Comment Routes
router.get('/', getTaskComments);
router.get('/:comment_id', getATaskComment);
router.post('/', postTaskComment);
router.put('/:comment_id', putTaskComment);
router.delete('/:comment_id', deleteTaskComment);


module.exports = router;

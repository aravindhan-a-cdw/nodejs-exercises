const { Router } = require("express");
const { userPostController } = require('../controllers/user.controllers');

const router = Router();

router.post('/', userPostController);


module.exports = router;
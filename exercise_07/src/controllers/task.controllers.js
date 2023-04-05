
const taskGetAllController = (req, res) => {
    res.send("/task Get route");
}

const taskGetController = (req, res) => {
    res.send(`/task/${req.params.id} Get route`);
}
const taskPostController = (req, res) => {
    res.send("/task Post route");
}
const taskPutController = (req, res) => {
    res.send(`/task/${req.params.id} Put route`);
}
const taskDeleteController = (req, res) => {
    res.send(`/task/${req.params.id} Delete route`);
}

module.exports = {
    taskGetAllController,
    taskGetController,
    taskPostController,
    taskPutController,
    taskDeleteController
}
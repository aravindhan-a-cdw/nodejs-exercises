
const getTaskComments = (req, res) => {
    res.send("/task Get route");
}

const getATaskComment = (req, res) => {
    res.send(`/task/${req.params.id} Get route`);
}
const postTaskComment = (req, res) => {
    res.send("/task Post route");
}
const putTaskComment = (req, res) => {
    res.send(`/task/${req.params.id} Put route`);
}
const deleteTaskComment = (req, res) => {
    res.send(`/task/${req.params.id} Delete route`);
}

module.exports = {
    getTaskComments,
    getATaskComment,
    postTaskComment,
    putTaskComment,
    deleteTaskComment
}
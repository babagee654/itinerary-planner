// viewsController.js
exports.getIndexPage = (req, res) => {
    res.render('index', { title: 'Express EJS Project', user: { username: "John Doe" } });
};


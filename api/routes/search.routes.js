module.exports = app => {
    const search = require("../controllers/search.controller.js");

    var router = require("express").Router();

    // search tracks
    router.get("/", search.search);

    app.use('/api/search', router);
};
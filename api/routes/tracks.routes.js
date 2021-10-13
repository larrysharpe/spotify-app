module.exports = app => {
    const tracks = require("../controllers/tracks.controller.js");

    var router = require("express").Router();

    // Create a new track
    router.post("/", tracks.create);

    // List tracks
    router.get("/", tracks.findAll);

    // Delete all tracks
    router.delete("/", tracks.deleteAll);

    // Retrieve a single track with ISRC
    router.get("/:ISRC", tracks.findOne);

    // Delete a track with id
    router.delete("/:id", tracks.delete);

    app.use('/api/tracks', router);
};
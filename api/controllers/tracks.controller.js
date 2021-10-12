const db = require("../models");
const SpotifyService = require("../services/spotify.service");
const Tracks = db.tracks;

const SpotifyConfig = require('../config/spofity.config');
if (!SpotifyConfig.accessToken) {
    console.log('accessTokenMissing')
    SpotifyService.getAuthToken();
}

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    const { ISRC } = req.query;
    // Validate request
    if (!ISRC) {
        res.status(400).send({
            message: "ISRC is required"
        });
        return;
    }

    const apiData = await SpotifyService.getTrackByISRC(ISRC);
    const { name: title, artists, album: { images } } = apiData.tracks?.items?.[0];

    // Create a Track
    const track = {
        ISRC,
        title,
        imageURL: images[0].url,
        artists: artists.map( artist => { return artist.name } ).join(',')
    };

    // Save track in the database
    Tracks.create(track)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Track."
            });
        });
};

// Retrieve all Tracks from the database.
exports.findAll = (req, res) => {
    Tracks.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tracks."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const { ISRC } = req.params;

    Tracks.findByPk(ISRC)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Track with ISRC=" + ISRC
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tracks.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Track was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Track with id=${id}. Maybe Track was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Track with id=" + id
            });
        });
};

// Delete all Tracks from the database.
exports.deleteAll = (req, res) => {
    Tracks.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tracks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tracks."
            });
        });
};
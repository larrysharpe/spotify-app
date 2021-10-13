const db = require("../models");
const Sequelize = require('sequelize');
const SpotifyService = require("../services/spotify.service");
const Tracks = db.tracks;
const Op = Sequelize.Op;

const SpotifyConfig = require('../config/spofity.config');
if (!SpotifyConfig.accessToken) {
    console.log('accessTokenMissing')
    SpotifyService.getAuthToken();
}

// Create and Save a new track
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
    const { artist } = req.query;
    let conditions;
    if ( artist ) {
        conditions = {
            where: {
                artists: {
                    [Op.like]: `%${artist}%`
                }
            }
        }
    }

    Tracks.findAll(conditions)
        .then(data => {
            data.forEach( track => track.artists = [track.artists] )
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tracks."
            });
        });
};

// Find a single track with an isrc
exports.findOne = (req, res) => {
    const { ISRC } = req.params;

    Tracks.findByPk(ISRC.trim())
        .then(data => {
            if (data.dataValues) {
                data.dataValues.artists = [data.dataValues.artists]
                res.send(data.dataValues);
            } else {
                res.status(404).send({
                    message: `Cannot find track with ISRC=${ISRC}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Track with ISRC=" + ISRC
            });
        });
};

// Delete a track with the specified ISRC in the request
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
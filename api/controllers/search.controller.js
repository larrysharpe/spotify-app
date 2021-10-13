const db = require("../models");
const SpotifyService = require("../services/spotify.service");

const SpotifyConfig = require('../config/spofity.config');
if (!SpotifyConfig.accessToken) {
    console.log('accessTokenMissing')
    SpotifyService.getAuthToken();
}

// Search the database.
exports.search = async (req, res) => {
    const data = await SpotifyService.searchTracksByTitle(req.query.title)
    const responseData = data.tracks.items.map( (item, index) => ({
        artists: item.artists.map( (artist) => artist.name ),
        imageURL: item.album.images[2].url,
        ISRC: item.external_ids.isrc,
        title: item.name
    } ) );

    console.log(data.tracks.items)

    res.status(200).send(responseData);
};
const axios = require('axios');
const SpotifyConfig = require('../config/spofity.config');

const getAuthToken = () => {

    const authToken = Buffer.from(`${SpotifyConfig.clientId}:${SpotifyConfig.clientSecret}`).toString('base64');

    let options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authToken}`
        },
        params: {
            grant_type: 'client_credentials'
        }
    }
    axios(options)
        .then((resp) => {
            console.log('accessTokenRetreived');
            SpotifyConfig.accessToken = resp.data.access_token;
        })
        .catch((err) => {
            console.log('ERR GETTING SPOTIFY ACCESS TOKEN', err);
        })
}

const getTrackByISRC = (ISRC) => {
    let options = {
        url: `https://api.spotify.com/v1/search?q=isrc:${ISRC}&type=track`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${SpotifyConfig.accessToken}`
        }
    }
    return axios(options)
        .then((resp) => {
           return resp.data;
        })
        .catch((err) => {
            console.log('ERR GETTING SPOTIFY ACCESS TOKEN', err);
        })
}

module.exports = {
    getAuthToken,
    getTrackByISRC
}
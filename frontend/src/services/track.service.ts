import axios from 'axios';

const tracksAPIURL = 'http://localhost:1981/api/tracks';

export interface ITrack {
    ISRC: string,
    title: string,
    imageURL: string,
    artists: string,
    updatedAt: string,
    createdAt: string,
}

const create = async (ISRC: string) => {
   const response = await axios.post<ITrack>(`${tracksAPIURL}?ISRC=${ISRC}`)
   return response.data;
}

const list = async () => {
    const response = await axios.get<ITrack[]>(`${tracksAPIURL}`)
    return response.data;
}

const byISRC = async (ISRC: string) => {
    const response = await axios.get<ITrack>(`${tracksAPIURL}/${ISRC}`)
    return response.data;
}


const byArtist = async (artist: string) => {
    const response = await axios.get<ITrack[]>(`${tracksAPIURL}?artist=${artist}`)
    return response.data;
}

const trackSVC = {
    byArtist,
    byISRC,
    create,
    list
}

export default trackSVC;
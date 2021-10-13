import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

import SearchAPI from "../../services/search.service";
import TrackAPI, {ITrack} from "../../services/track.service";

export interface ISearchResult {
    title: string;
}

const defaultSearchResults: ISearchResult[] = [];
const defaultLocalTracks: ITrack[] = [];

function App() {

    const [searchResults, setSearchResults] = useState<ISearchResult[]>(defaultSearchResults)
    const [localTracks, setLocalTracks] = useState<ITrack[]>([])

    const search = async (e: any) => {
        if (e.target?.value?.length > 2) {
            const results = await SearchAPI.search(e.target.value);
            setSearchResults(results)
        }
    }

    const searchISRC = async (e: any) => {
        if (e.target?.value?.length > 6) {
            const results = await TrackAPI.byISRC(e.target.value)
            setSearchResults([results])
        }
    }

    const searchArtist = async (e: any) => {
        if (e.target?.value?.length > 3) {
            const results = await TrackAPI.byArtist(e.target.value)
            setSearchResults(results)
        }
    }

    const closeResults = () => {
        setSearchResults([]);
    }

    const loadLocalTrackList = () => {
        TrackAPI.list().then((results: ITrack[]) => {
            setLocalTracks(results);
        })
    }

    const saveTrack = (ISRC: string) => {
        TrackAPI.create(ISRC).then(loadLocalTrackList).then(closeResults)
    }

    useEffect(loadLocalTrackList, [])


    return (
        <div className="App">

            <div className="search-fields-container">
                <div>
            <TextField
                fullWidth
                variant="filled" label="Spotify Track Title Search" onChange={search}
                placeholder="Type Here to Search Spofity Tracks"/>
                </div>
                <div>
            <TextField
                fullWidth
                variant="filled" label="Local ISRC Search" onChange={searchISRC}
                placeholder="Type Here to Search Local DB by ISRC"/>
                </div>
                <div>
            <TextField
                fullWidth
                variant="filled" label="Local Artist Search" onChange={searchArtist}
                placeholder="Type Here to Search Local DB by Artist"/>
                </div>
            </div>
            {searchResults.length > 0 &&
            <div className="search-results-wrapper">
                <div className="results-wrapper">
                    <h4>Click on A track To Add It To Local DB</h4>
                    <div className="search-results">
                        {searchResults.map((result: any, key: number) =>
                            <div key={key} className="track-row" onClick={() => saveTrack(result.ISRC)}>
                                <img src={result.imageURL} className="track-image"/>
                                <div className="track-info">
                                    <span className="track-title">{result.title}</span>
                                    {result.artists.map((artist: string, artistKey: number) =>
                                        <div key={artistKey} className="track-artist">{artist}</div>)}
                                </div>
                            </div>)}
                    </div>
                    <div>
                        <Button onClick={closeResults} color="primary" variant="contained">Close</Button>
                    </div>
                </div>
            </div>
            }

            {localTracks.length === 0 && <>
                <h2>You currently have no local tracks</h2>
                <p>Add some by search above.</p>
            </>}


            {localTracks.length > 0 && <>
                <h2>Local Tracks</h2>
                <p>Tracks saved in our local DB</p>

                <div className="results-wrapper">
                    <div className="search-results">
                        {localTracks.map((result: any, key: number) =>
                            <div key={key} className="track-row" onClick={() => saveTrack(result.ISRC)}>
                                <img src={result.imageURL} className="track-image" />
                                <div className="track-info">
                                    <span className="track-title">{result.title}</span>
                                    {result.artists.map((artist: string, artistKey: number) =>
                                        <div key={artistKey} className="track-artist">{artist}</div>)}
                                </div>
                            </div>)}
                    </div>
                </div>
            </>}
        </div>
    );
}

export default App;

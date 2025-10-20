import express from "express";
import fs from "fs";

import { request } from "http";

const app = express();
const port = 3000;

const musicData = JSON.parse(fs.readFileSync("datafile.json", "utf-8"));

app.get("/search", (request, response) => {
    const query = request.query.song?.toLowerCase();
    if(!query) return response.json({ found: false });

    let foundSong = null;

    for (const album of musicData.albums) {
        for (const song of album.songs){
            if (song.toLowerCase() === query) {
                foundSong = { song, album: album.title, artist: album.artist};
                break;
            }
        }
        if (foundSong) break; 
    }
    if (foundSong) response.json({found: true, ...foundSong});
    else response.json({found: false});
});

app.listen(port, () => console.log("serveren kører som den skal") )
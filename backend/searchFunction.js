import express, { response } from 'express';
import fs from "fs";
import cors from "cors";    

const server = express();
server.use(cors());

const port = 3000;

const musicData = JSON.parse(fs.readFileSync("./backend/datafile.json"));
const albums = musicData.albums

server.use(express.static('frontend'));

server.get('/search', onMusicData) 

server.listen(port, onServerReady)


function onMusicData(request, response) {
    const query = (request.query.song.toLowerCase()); // gør søgningen case-insensitive
    let matchingTracks = [];

    console.log(request.query.song);

    for (let i = 0; i < albums.length; i++) {
        for (let h = 0; h < albums[i].tracks.length; h++) {
            const trackTitle = albums[i].tracks[h].title.toLowerCase();
            if (trackTitle.includes(query)) { // match hvor som helst i teksten
                matchingTracks.push({
                    album: albums[i].name,
                    track: albums[i].tracks[h]
                });
            }
        }
    }

    if (matchingTracks.length > 0) {
        response.json({ found: true, results: matchingTracks });
    } else {
        response.json({ found: false });
    }
}

function onServerReady() {
    console.log('webserver running on port', port)
}

server.listen(port, () => console.log('serveren kører som den skal') )
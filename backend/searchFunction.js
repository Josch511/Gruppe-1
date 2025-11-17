import express from 'express';
import fs from "fs";
import cors from "cors";    

const server = express();
server.use(cors());

const port = 3000;

const musicData = JSON.parse(fs.readFileSync("./backend/datafile.json", "utf8"));
const albums = musicData.albums;

server.use(onEachRequest);
server.use(express.static('frontend'));

server.get('/search', onMusicData);

server.listen(port, () => console.log('webserver running on port', port));


// -------------------- FUNCTIONS --------------------

function onMusicData(request, response) {
    const query = request.query.song?.toLowerCase() || '';
    const matches = [];

    for (const album of albums) {
        for (const track of album.tracks) {
            if (track.title.toLowerCase().includes(query)) {
                matches.push({
                    title: track.title,
                    albumTitle: album.title,
                    artist: album.artist.name
                });
            }
        }
    }

    if (matches.length > 0) {
        response.json({ found: true, tracks: matches });
    } else {
        response.json({ found: false, tracks: [] });
    }
}

function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}
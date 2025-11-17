import express from 'express';
import fs from "fs";
import cors from "cors";    

const server = express();
server.use(cors());

// den server vi bruger 
const port = 3000;

// her henter vi data fra json filen datafile.json
const musicData = JSON.parse(fs.readFileSync("./backend/datafile.json", "utf8"));
const albums = musicData.albums;

server.use(onEachRequest);
server.use(express.static('frontend'));

server.get('/search', onMusicData);

// fortæller bare hvilken port serveren skal lytte til 
server.listen(port, () => console.log('webserver running on port', port));


// function der tjekker efter sange der matcher søgningen, funktionen tjekker alle albums og 
// tracks både titler og artist og name
function onMusicData(request, response) {
    const query = request.query.song?.toLowerCase() || '';
    const matches = [];

    for (const album of albums) {
        for (const track of album.tracks) {
            if (track.title.toLowerCase().startsWith(query)) {
                matches.push({
                    title: track.title,
                    albumTitle: album.title,
                    artist: album.artist.name
                });
            }
        }
    }

    // hvis den finder et match så svarer den. med det korrekte match

    if (matches.length > 0) {
        response.json({ found: true, tracks: matches });

    // ellers svarer den bare med et tomt array, altså ingenting 
    // - enten forslag til din søgning, eller "vi fandt dsv ikke sangen du ledte efter" hvis den slet ik er til at finde
    } else {
        response.json({ found: false, tracks: [] });
    }
}

// logger i console hvornår der kommer en request og en response og hvad tid, metode og url 
function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}
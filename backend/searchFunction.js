import express, { response } from 'express';
import fs from "fs";
import cors from "cors";    

// import { music } from './datafile.json' with {type: "json"};
// const data = require("./datafile.json");
// console.log(data);

const server = express();
server.use(cors());

const port = 3000;

// const albums = data.albums;

const musicData = JSON.parse(fs.readFileSync("./backend/datafile.json"));
const albums = musicData.albums

server.use(express.static('frontend'));
server.use(onEachRequest);

server.get('/search', onMusicData) 

server.listen(port, onServerReady)


function onMusicData(request, response){
    const query = (request.query.song);
    let foundAlbum = null;

console.log(request.query.song)

    for (let i = 0; i < albums.length; i ++){

        for (let h = 0; h < albums[i].tracks.length; h ++){
            //console.log(albums[i].tracks[h].title)
            if (albums[i].tracks[h].title == query){
                console.log("found")
            foundAlbum = albums[i];
            break;
            }
        }
    }
    console.log(foundAlbum);

 if (foundAlbum) {response.json({found: true, album: foundAlbum});}
    else response.json({found: false});

}
function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}

function onServerReady() {
    console.log('webserver running on port', port)
}

server.listen(port, () => console.log('serveren kører som den skal') )
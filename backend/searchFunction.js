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

function onMusicData(request, response){
    const query = (request.query.song);
    let foundAlbum = null;

console.log(request.query.song)

    for (let i = 0; i < albums.length; i ++){

        for (let h = 0; h < albums[i].tracks.length; h ++){
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
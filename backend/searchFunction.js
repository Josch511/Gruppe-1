import express, { response } from "express";
import { albums } from "./datafile.json";

const port = 3000;
const server = express();

server.use(express.static("frontend"));
server.use(onEachRequest);

server.get("/search", onMusicData);

server.listen(port, onServerReady);


function onMusicData(request, response){
    const query = Number(request.params.query).toLowerCase();
    let foundAlbum = null;

    for (let i = 0; i < albums.length; i ++){
        if (albums[i].query == query) {
        foundAlbum = albumstestest[i];
        break;
        }
    }

    if (foundAlbum) {
        response.json(foundAlbum);
    } else {
        response.status(404).json({error: "sang ikke fundet"});
    }
}

app.listen(port, () => console.log("serveren kører som den skal") )
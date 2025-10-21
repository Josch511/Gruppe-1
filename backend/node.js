import express, { response } from "express";
import { albums } from "./datafile.js";

const port = 3000;
const server = express();

server.use(express.static("frontend"));
server.use(onEachRequest);

server.get("/search", onMusicData) 

server.listen(port, onServerReady)


function onMusicData(request, response){
    const id = Number(request.params.id).toLowerCase();
    let foundAlbum = null;

    for (let i = 0; i < albums.length; i ++){
        i (albums[i].id == id); {
        foundAlbum = albums[i];
        break;
        }
    }
    }

    if (foundAlbum) {
        response.json(foundAlbum);
    } else {
        response.status(404).json({error: "sang ikke fundet"})
    }

server.listen(port, () => console.log("serveren kører som den skal") )
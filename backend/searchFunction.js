import express, { response } from 'express';
import { albums } from './datafile.json';


const server = express();
const port = 3000;

server.use(express.static('frontend'));
server.use(onEachRequest);

server.get('/search', onMusicData) 

server.listen(port, onServerReady)


function onMusicData(request, response){
    const query = Number(request.params.id).toLowerCase();
    let foundAlbum = null;

    for (let i = 0; i < albums.length; i ++){
        i (albums[i].query == query); {
        foundAlbum = albums[i];
        break;
        }
    }
    }

    if (foundAlbum) {
        response.json(foundAlbum);
    } else {
        response.status(404).json({error: 'sang ikke fundet'})
    }


app.listen(port, () => console.log('serveren kører som den skal') )
import express from "express";
import fs from "fs";
import cors from "cors";    

const app = express();
const port = 3000;

app.use(cors());

const musicData = JSON.parse(fs.readFileSync("datafile.json", "utf-8"));

app.get("/search", (request, response) => {
    const query = request.query.song?.toLowerCase();
    if(!query) return response.json({ found: false });

    let foundSong = null;

    for (const album of musicData.albums) {
        for (const track of album.tracks){
            if (track.title.toLowerCase() === query.toLowerCase()) {
                foundSong = { 
                    song: track.title,
                    album: album.title, 
                    artist: album.artist.name
                };
                break;
            }
        }
        if (foundSong) break; 
    }
    if (foundSong) response.json({found: true, ...foundSong});
    else response.json({found: false});
});

app.listen(port, () => console.log("serveren kører som den skal") )
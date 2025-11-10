import express from "express";
import { albums } from "./datafile.json" assert { type: "json" }; // vigtigt i ES-modules!

const port = 3000;
const app = express();

// Gør mappen 'frontend' tilgængelig som statiske filer
app.use(express.static("frontend"));

// Håndtér søge-requests
app.get("/search", (req, res) => {
  // hent ?song= fra querystring
  const query = req.query.song?.toLowerCase() || "";

  // find album i dine data (tilpas efter datafile.json’s struktur)
  const foundAlbum = albums.find((album) =>
    album.song.toLowerCase().includes(query)
  );

  if (foundAlbum) {
    res.json({
      found: true,
      song: foundAlbum.song,
      artist: foundAlbum.artist,
      album: foundAlbum.album,
    });
  } else {
    // hvis intet fundet, returnér også forslag (til autocomplete)
    const suggestions = albums
      .filter((album) => album.song.toLowerCase().includes(query))
      .slice(0, 5)
      .map((a) => ({ song: a.song, artist: a.artist }));

    res.json({ found: false, suggestions });
  }
});

// Start serveren
app.listen(port, () => {
  console.log(`✅ Serveren kører på http://localhost:${port}`);
});

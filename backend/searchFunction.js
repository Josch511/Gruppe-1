import express from "express";
import data from "./datafile.json" assert { type: "json" };

const app = express();
const port = 3000;

// Gør din frontend-mappe tilgængelig (fx index.html, script.js osv.)
app.use(express.static("frontend"));

// --- API: /search?song=navn ---
app.get("/search", (req, res) => {
  const query = req.query.song?.toLowerCase() || "";
  console.log("🔍 Søger efter:", query);

  if (!query) return res.json({ found: false, suggestions: [] });

  let foundTrack = null;
  let foundAlbum = null;

  // Gennemgå alle albums og deres tracks
  for (const album of data.albums) {
    for (const track of album.tracks) {
      if (track.title.toLowerCase() === query) {
        foundTrack = track;
        foundAlbum = album;
        break;
      }
    }
    if (foundTrack) break;
  }

  // Hvis eksakt match findes
  if (foundTrack) {
    return res.json({
      found: true,
      song: foundTrack.title,
      artist: foundAlbum.artist.name,
      album: foundAlbum.title,
      genre: foundTrack.genre.name,
      price: foundTrack.price_usd
    });
  }

  // Ellers lav forslag (autocomplete)
  const suggestions = [];
  for (const album of data.albums) {
    for (const track of album.tracks) {
      if (track.title.toLowerCase().includes(query)) {
        suggestions.push({
          song: track.title,
          artist: album.artist.name,
          album: album.title
        });
      }
    }
  }

  res.json({
    found: false,
    suggestions: suggestions.slice(0, 5) // max 5 forslag
  });
});

// --- Server klar ---
app.listen(port, () => {
  console.log(`✅ Serveren kører på http://localhost:${port}`);
});

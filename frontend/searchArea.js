const inputArea = document.getElementById('inputArea');
const resultEl = document.getElementById('result');
const suggestionsEl = document.getElementById('suggestions');   // <-- dropdown element

let timeoutId = null;

// Auto search: trigger søgning mens du skriver (debounce)
inputArea.addEventListener('input', () => {
    const query = inputArea.value.trim();

    // Skjul hvis tomt
    if (!query) {
        resultEl.textContent = '';
        suggestionsEl.style.display = "none"; 
        return;
    }

    // Debounce: vent 300ms efter sidste tast
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        searchSong(query);
    }, 300);
});

// Klik udenfor → skjul dropdown
document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-box')) {
        suggestionsEl.style.display = "none";
    }
});

async function searchSong(query) {
    try {
        // Send query til backend
        const res = await fetch(`/search?song=${encodeURIComponent(query)}`);
        const data = await res.json();

        // Fjern gamle forslag
        suggestionsEl.innerHTML = '';

        if (data.found && data.tracks.length > 0) {
            const matches = data.tracks.slice(0, 5);

            suggestionsEl.style.display = "block"; // vis dropdown

            matches.forEach(track => {
                const p = document.createElement('p');
                p.textContent = track.title;

                // Når man klikker et forslag
                p.addEventListener('click', () => {
                    inputArea.value = track.title;       // udfyld inputfelt
                    suggestionsEl.style.display = "none";

                    // Vis valgt resultat
                    resultEl.innerHTML = `"${track.title}" af ${track.artist} fra albummet "${track.albumTitle}"`;
                });

                suggestionsEl.appendChild(p);
            });

        } else {
            suggestionsEl.style.display = "none";
        }

    } catch (error) {
        console.error(error);
        resultEl.textContent = 'Der opstod en fejl, prøv igen';
        suggestionsEl.style.display = "none";
    }
}

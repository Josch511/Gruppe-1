const inputArea = document.getElementById('inputArea');
const resultEl = document.getElementById('result');

let timeoutId = null;

// Auto search: trigger søgning mens du skriver (debounce)
inputArea.addEventListener('input', () => {
    const query = inputArea.value.trim();

    // Stop hvis input er tomt
    if (!query) {
        resultEl.textContent = '';
        return;
    }

    // Debounce: vent 300ms efter sidste tast
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        searchSong(query);
    }, 300);
});

async function searchSong(query) {
    try {
        // Send query til backend
        const res = await fetch(`/search?song=${encodeURIComponent(query)}`);
        const data = await res.json();

        // Tøm resultater
        resultEl.innerHTML = '';

        if (data.found && data.tracks.length > 0) {
            // Vis alle matches (eller begræns fx til 5)
            const matches = data.tracks.slice(0, 5);
            matches.forEach(track => {
                const p = document.createElement('p');
                p.textContent = `Vi fandt sangen "${track.title}" af ${track.artist} fra albummet "${track.albumTitle}"`;
                resultEl.appendChild(p);
            });
        } else {
            resultEl.textContent = 'Vi kunne desværre ikke finde en sang der matchede din søgning, prøv igen.'
        }

    } catch (error) {
        console.error(error);
        resultEl.textContent = 'Der opstod en fejl, prøv igen';
    }
}

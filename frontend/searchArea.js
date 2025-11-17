document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('inputArea').value.trim();
    const resultEl = document.getElementById('result');
    
    if (!query) {
        resultEl.textContent = 'Indtast en sangtitel';
        return;
    }    

    try {
        const res = await fetch(`http://localhost:3000/search?song=${encodeURIComponent(query)}`);
        const data = await res.json();

        console.log(data)

        if (data.found){
            resultEl.textContent = `Vi fandt sangen "${query}" af ${data.album.artist.name} fra albummet "${data.album.title}".`;
        } else {
            resultEl.textContent = 'Vi kunne desværre ikke finde en sang der matchede din søgning, prøv igen.'
        }
    } catch (error) {
        console.error(error);
        resultEl.textContent = 'Der opstod en fejl, prøv igen';
    }
});

function onEnter() {
    document.getElementById("inputArea").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchBtn").click();
        }
    });
}

onEnter();



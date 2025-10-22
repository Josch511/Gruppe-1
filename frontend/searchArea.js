document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("inputArea").value.trim();
    const resultEl = document.getElementById("result");
    
    if (!query) {
        resultEl.textContent = "Indtast en sangtitel";
        return;
    }    

    try {
        const res = await fetch(`http://localhost:3000/search?song=${encodeURIComponent(query)}`);
        const data = await res.js();

        if (data.found){
            resultEl.textContent = `Vi fandt sangen "${data.song}" af ${data.artist} fra albummet "${data.album}".`;
        } else {
            resultEl.textContent = "Vi kunne dsv ikke finde en sang der matchede din søgning, prøv igen."
        }
    } catch (error) {
        console.error(error);
        resultEl.textContent = "Der opstod en fejl, prøv igen";
    }
});



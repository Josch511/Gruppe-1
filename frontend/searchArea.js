const input = document.getElementById("inputArea");
const suggestionsBox = document.getElementById("suggestions");
const resultEl = document.getElementById("result");

input.addEventListener("input", async () => {
  const query = input.value.trim();
  suggestionsBox.innerHTML = "";

  if (!query) return;

  try {
    const res = await fetch(`/search?song=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.found) {
      resultEl.textContent = `🎵 ${data.song} — ${data.artist} (${data.album})`;
    } else if (data.suggestions.length > 0) {
      data.suggestions.forEach(s => {
        const div = document.createElement("div");
        div.textContent = `${s.song} — ${s.artist}`;
        div.classList.add("suggestion");
        div.onclick = () => {
          input.value = s.song;
          resultEl.textContent = `🎵 ${s.song} — ${s.artist} (${s.album})`;
          suggestionsBox.innerHTML = "";
        };
        suggestionsBox.appendChild(div);
      });
    } else {
      resultEl.textContent = "Ingen resultater";
    }
  } catch (err) {
    console.error(err);
    resultEl.textContent = "Der opstod en fejl, prøv igen";
  }
});

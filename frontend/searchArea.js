// Tilføj event listener på knappen
document.getElementById("searchBtn").addEventListener("click", searchSong);

// Gør det muligt at trykke "Enter" i inputfeltet
document.getElementById("inputArea").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchSong();
  }
});

async function searchSong() {
  const query = document.getElementById("inputArea").value.trim();
  const resultEl = document.getElementById("result");

  // Ryd tidligere resultater
  resultEl.textContent = "";
  resultEl.style.color = "#333";

  if (!query) {
    resultEl.textContent = "Indtast en sangtitel 🎵";
    resultEl.style.color = "red";
    return;
  }

  // Vis "loader"
  resultEl.textContent = "Søger efter sangen... 🔍";

  try {
    const res = await fetch(
      `http://localhost:3000/search?song=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error(`Serverfejl: ${res.status}`);
    }

    const data = await res.json();

    if (data.found) {
      resultEl.innerHTML = `
        ✅ Vi fandt sangen: <strong>${data.song}</strong><br>
        👨‍🎤 Kunstner: <em>${data.artist}</em><br>
        💿 Album: <em>${data.album}</em>
      `;
      resultEl.style.color = "green";
    } else {
      resultEl.textContent =
        "❌ Vi kunne desværre ikke finde en sang, der matchede din søgning.";
      resultEl.style.color = "orange";
    }
  } catch (error) {
    console.error(error);
    resultEl.textContent = "🚨 Der opstod en fejl, prøv igen.";
    resultEl.style.color = "red";
  }}
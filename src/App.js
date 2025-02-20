// Hay que echarle un vistazo con calma a esto
const API_KEY = "204f8c2913c54a75a1ce44830ffac870";
const BASE_URL = "https://api.rawg.io/api/games";

// Función para obtener juegos populares
async function fetchPopularGames() {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&page_size=5`);
    const data = await response.json();
    console.log("Juegos populares:", data.results);
  } catch (error) {
    console.error("Error al obtener datos de RAWG:", error);
  }
}

// Llamar a la función cuando la página cargue
fetchPopularGames();

const gameResults = document.getElementById("game-results");

async function fetchAndDisplayGames() {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&page_size=5`);
    const data = await response.json();

    gameResults.innerHTML = ""; // Limpiar resultados previos

    data.results.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card");

      gameCard.innerHTML = `
                <img src="${game.background_image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>Rating: ${game.rating} ⭐</p>
            `;

      gameResults.appendChild(gameCard);
    });
  } catch (error) {
    console.error("Error al obtener y mostrar juegos:", error);
  }
}

// Llamar a la función cuando la página cargue
fetchAndDisplayGames();

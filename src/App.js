const API_KEY = "204f8c2913c54a75a1ce44830ffac870";
const BASE_URL = "https://api.rawg.io/api/games";

/*Una vez tenemos los datos de la API, tenemos que insertarlos en nuestro HTML
Con document.getElementById("recomendaciones") creamos la sección donde pondremos los juegos
con contenedor.innerHTML borramos el contenido anterior antes de insertar nuevos datos
forEach() recorre la lista de juegos y crea un div para cada uno
InnerHTML para insertar la imagen, el nombre, la fecha del juego y la puntuación en Metacritic en cada div
appendChild para añadirlo al HTML*/

function mostrarJuegos(juegos) {
  const contenedor = document.getElementById("resultados-busqueda");
  contenedor.innerHTML = "";

  juegos.forEach((juego) => {
    const juegoElemento = document.createElement("div");
    juegoElemento.classList.add("juego");

    juegoElemento.innerHTML = `
    <img src="${juego.background_image}" alt="${juego.name}">
    <h3>${juego.name}</h3>
    <p>Fecha de lanzamiento: ${juego.released}</p>
    <p>Metacritic: ${juego.metacritic}</p>
    `;

    contenedor.appendChild(juegoElemento);
  });
}

/*A continuación vamos a capturar el evento del botón de búsqueda cuando el usuario quiera realizar una búsqueda.
Con getElementById("searchBTN") seleccionamos el botón de búsqueda y con .addEventListener("click", buscarJuego) ejecutamos la
función buscarJuego cuando el usuario haga clic.
Con .addEventListener(keypress, function (e)) nos permite activar la función de búsqueda al presionar enter.*/
document.getElementById("searchBtn").addEventListener("click", buscarJuego);
document.getElementById("busqueda").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    buscarJuego();
  }
});

/*Ahora crearemos la función buscarJuego()
 En primer lugar capturamos el nombre del juego y eliminamos los espacios con .trim()
 En caso de que no se haya escrito ningún nombre mostramos alerta con la palabra reservada alert
 Hacemos petición a la API usando search= en la URL que habíamos creado con nuestra key
 Con response.ok verificamos que funcione correctamente
 Llamamos a la función mostrarJuegos para que nos muestre los resultados en nuestro HTML*/

async function buscarJuego() {
  const query = document.getElementById("busqueda").value.trim();
  if (query === "") {
    alert("Introduce el nombre de un juego");
    return;
  }

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=10`
    );
    if (!response.ok) {
      throw new Error("Error al buscar el juego");
    }

    const data = await response.json();
    console.log("Resultados de la búsqueda:", data.results);

    /*Con (data.results.length === 0) indicamos que si la API no devuelve los juegos se tiene que llamar a la función mostrarMensaje
Con mostrarMensaje() mostramos un texto con el mensaje que queramos */
    if (data.results.length === 0) {
      mostrarMensaje("Juego no encontrado. Prueba con otro nombre");
      return;
    }

    mostrarJuegos(data.results);
  } catch (error) {
    console.error("Error en la búsqueda", error);
    mostrarMensaje("Error buscando el juego. Inténtalo de nuevo.");
  }
}

//Declaramos la función mostrarMensaje(). Seleccionamos el contenedor #recomendaciones y le insertamos un <p> con la clase mensaje
//Limpiamos el contenido anterior con .innerHTML

function mostrarMensaje(mensaje) {
  const contenedor = document.getElementById("recomendaciones");
  contenedor.innerHTML = `<p class="mensaje">${mensaje}</p>`;
}

/* Primero haremos una petición a la API desde nuestra página con fetch () que nos permite hacer peticiones a servidores web.
Con (`${BASE_URL}?key=${API_KEY}`) construimos la URL de la API desde donde se obtendrán los datos.
Con page_size=5 limitamos los juegos recomendados a un máximo de 5
La palabra reservada await detiene la ejecución hasta que responda la API
Con throw new Error detenemos la eejcución para mostrar mensaje en consola si existe algún error.*/

async function cargarJuegosRecomendados() {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&page_size=5`);
    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    /*Como los datos de la API están en JSON necesitaremos convertirlos para poder usarlos en nuestra web.
response.json() convierte la respuesta en un objeto de JavaScript
data.results contiene la lista de juegos
console.log() nos permite ver los datos en la consola del navegador para verificar que funciona*/
    const data = await response.json();
    console.log("Juegos recomendados", data.results);

    mostrarJuegosRecomendados(data.results);
  } catch (error) {
    console.error("Error al obtener juegos recomendados", error);
    mostrarMensaje("No se ha podido cargar los juegos recomendados");
  }
}

/* Declaramos la función mostrarJuegosRecomendados para recorrer la lista de juegos y crear un div para cada uno.
Mostramos imagen, nombre y metacritic de cada juego y añadimos cada juego al contenedor #lista-recomendaciones*/
function mostrarJuegosRecomendados(juegos) {
  const contenedor = document.getElementById("recomendaciones");
  contenedor.innerHTML = "";

  juegos.forEach((juego) => {
    const juegoElemento = document.createElement("div");
    juegoElemento.classList.add("juego");

    juegoElemento.innerHTML = `<img src="${juego.background_image}" alt="${juego.name}">
    <h3>${juego.name}</h3>
    <p>Metacritic: ${juego.metacritic}</p>
    `;

    contenedor.appendChild(juegoElemento);
  });
}

//Como queremos que esta función se cargue al entrar en la página usaremos un listener en el DOM

document.addEventListener("DOMContentLoaded", () => {
  cargarJuegosRecomendados();
});

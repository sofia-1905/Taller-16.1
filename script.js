const carousel = document.getElementById("carousel");
const prevBookButton = document.getElementById("prevBook");
const nextBookButton = document.getElementById("nextBook");

let books = []; // Lista de libros
let currentIndex = 0; // Índice del libro actual

// Mostrar mensaje de carga
function showLoadingMessage() {
  carousel.innerHTML = `<p>Cargando libros...</p>`;
  prevBookButton.style.display = "none"; // Ocultar flechas
  nextBookButton.style.display = "none"; // Ocultar flechas
}

// Limpiar mensaje de carga
function hideLoadingMessage() {
  carousel.innerHTML = "";
}

// Función para renderizar libros en el carrusel
function renderCarousel() {
  hideLoadingMessage(); // Ocultar mensaje de carga
  carousel.innerHTML = ""; // Limpiar carrusel
  books.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.style.display = "none"; // Ocultar todos los libros inicialmente
    if (index === currentIndex) {
      bookDiv.style.display = "block"; // Mostrar solo el libro actual
    }
    const img = document.createElement("img");
    const coverId = book.cover_i;
    img.src = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://via.placeholder.com/150?text=No+Image";
    img.alt = book.title;
    const title = document.createElement("p");
    title.textContent = book.title;
    bookDiv.appendChild(img);
    bookDiv.appendChild(title);
    carousel.appendChild(bookDiv);
  });
  prevBookButton.style.display = "inline-block"; // Mostrar flechas
  nextBookButton.style.display = "inline-block"; // Mostrar flechas
  updateControls();
}

// Función para actualizar el estado de los botones
function updateControls() {
  prevBookButton.disabled = currentIndex === 0;
  nextBookButton.disabled = currentIndex === books.length - 1;
}

// Función para obtener libros de la API
function fetchBooks() {
  showLoadingMessage(); // Mostrar mensaje de carga
  fetch("https://openlibrary.org/search.json?q=&limit=20")
    .then((response) => response.json())
    .then((data) => {
      books = data.docs; // Guardar libros
      currentIndex = 0; // Reiniciar al primer libro
      renderCarousel(); // Renderizar el carrusel
    })
    .catch((error) => {
      console.error("Error:", error);
      carousel.innerHTML = `<p>Error al cargar los libros. Inténtalo de nuevo.</p>`;
    });
}

// Eventos para las flechas
prevBookButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderCarousel();
  }
});

nextBookButton.addEventListener("click", () => {
  if (currentIndex < books.length - 1) {
    currentIndex++;
    renderCarousel();
  }
});

// Llamar a la función de carga de libros al inicio
fetchBooks();



const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim() || "fiction"; // Usam el texto ingresado o "fiction" como predeterminado
  fetchBooks(query);
});

function fetchBooks(query = "fiction") {
  showLoadingMessage(); // Mostrar mensaje de carga
  fetch(`https://openlibrary.org/search.json?q=${query}&limit=20`)
    .then((response) => response.json())
    .then((data) => {
      books = data.docs; // Guardar libros
      currentIndex = 0; // Reiniciar al primer libro
      renderCarousel(); // Renderizar el carrusel
    })
    .catch((error) => {
      console.error("Error:", error);
      carousel.innerHTML = `<p>Error al cargar los libros. Inténtalo de nuevo.</p>`;
    });
}

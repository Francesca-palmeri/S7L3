const url = "https://striveschool-api.herokuapp.com/books"; //costante per richiamare dopo l'API
const bookList = document.getElementById("bookList"); 
const arrayOfBooks = [];

// Chiama la funzione getBooks quando la pagina viene caricata
document.addEventListener("DOMContentLoaded", init);

function init() {
  getBooks();
}

// Funzione per ottenere i libri
async function getBooks() {
  await fetch(url, {
    method: "GET"
  })
  /*.then((response) => {
    return response.json();*/
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore generico");
      }
    })
    .then((books) => {// Itera attraverso l'array dei libri ottenuti dall'API
      books.forEach((book) => {
        createBookCard(book, bookList);// Crea una carta per ogni libro
      });
      arrayOfBooks.push(...books); // Salva i libri nell'array globale
      //console.log("arrayOfBooks", books);
    })
    .catch((error) => {
      console.log("ERRORE", error);
    });
}

// Funzione per creare una carta per ogni libro
function createBookCard(book, bookList) {
  const col = document.createElement("div");//crea div e colonne
  col.className = "col-md-4 col-lg-3 my-2";

  col.innerHTML = `
    <div class="card h-100">
      <img src="${book.img}" class="card-img-top" alt="Copertina del libro">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.price}</p>
        <button class="btn btn-danger btn-remove">Scarta</button>
      </div>
    </div>
  `;

  // Aggiungi l'evento click al pulsante "Scarta"
  col.querySelector(".btn-remove").addEventListener("click", () => {
    col.remove();// Rimuove la carta dal DOM quando viene cliccato il pulsante "Scarta
  });

  bookList.appendChild(col);// Aggiunge la colonna direttamente nella pagina HTML per la lista dei libri
}

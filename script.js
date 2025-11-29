const STORAGE_KEY = "RED_ARCHIVE_DATA";
const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchBook");
let books = [];

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem(STORAGE_KEY)) {
    books = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
  renderBooks();
});

function renderBooks() {
  bookList.innerHTML = "";
  books.forEach(function (book, index) {
    const newCard = document.createElement("article");
    newCard.classList.add("book-card");
    newCard.innerHTML = `
            <span class="status-badge">${book.status}</span>
            <button class="btn-delete" onclick="hapusBuku(${index})">[X]</button>
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <p class="book-desc">${book.desc}</p>
        `;
    bookList.prepend(newCard);
  });
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    status: document.getElementById("status").value,
    desc: document.getElementById("desc").value,
    id: +new Date(),
  };
  books.push(newBook);
  saveData();
  renderBooks();
  bookForm.reset();
  alert("DATA BERHASIL DIARSIPKAN.");

  // Otomatis pindah ke halaman list dan update tombol jadi merah
  showPage("list");
});

function hapusBuku(index) {
  if (confirm("Hapus arsip ini secara permanen dari database?")) {
    books.splice(index, 1);
    saveData();
    renderBooks();
  }
}

// FUNGSI GANTI HALAMAN & WARNA TOMBOL
function showPage(page) {
  const inputSection = document.querySelector(".input-section");
  const archiveSection = document.querySelector(".archive-section");
  const btnList = document.getElementById("btnList");
  const btnInput = document.getElementById("btnInput");

  if (page === "list") {
    archiveSection.style.display = "block";
    inputSection.style.display = "none";
    renderBooks();

    // Nyalakan tombol Database, Matikan tombol Input
    btnList.classList.add("active");
    btnInput.classList.remove("active");
  } else {
    archiveSection.style.display = "none";
    inputSection.style.display = "block";

    // Nyalakan tombol Input, Matikan tombol Database
    btnInput.classList.add("active");
    btnList.classList.remove("active");
  }
}

if (searchInput) {
  searchInput.addEventListener("keyup", function (e) {
    const term = e.target.value.toLowerCase();
    const cards = bookList.getElementsByClassName("book-card");
    Array.from(cards).forEach(function (card) {
      const title = card.querySelector(".book-title").textContent.toLowerCase();
      const author = card
        .querySelector(".book-author")
        .textContent.toLowerCase();
      if (title.includes(term) || author.includes(term)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

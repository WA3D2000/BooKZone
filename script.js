// --- 1. Load books from localStorage or start with empty array
let books = JSON.parse(localStorage.getItem("books")) || [];

// --- 2. Save books to localStorage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// --- 3. Display all books in the table
function displayBooks(filteredBooks = books) {
  const tbody = document.querySelector("#book-table tbody");
  tbody.innerHTML = "";

  filteredBooks.forEach((book) => {
    const row = `
      <tr class="hover:bg-pink-900 text-pink-600 hover:text-pink-50 text-[25px]">
        <td class="px-4 py-2 border-b">${book.title}</td>
        <td class="px-4 py-2 border-b">${book.author}</td>
        <td class="px-4 py-2 border-b">${book.pages}</td>
        <td class="px-4 py-2 border-b">${book.status}</td>
        <td class="px-4 py-2 border-b space-x-2">
          <button onclick="deleteBook(${book.id})"
           class="text-red-600 hover:underline">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// --- 4. Add new book on form submit
const form = document.getElementById("book-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  if (!title || !author || !pages || status === "select_state") {
    alert("Please fill all fields correctly.");
    return;
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    pages,
    status,
  };

  books.push(newBook);
  saveBooks();
  displayBooks();
  form.reset();
});

// --- 5. Delete a book
function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  saveBooks();
  displayBooks();
}

// --- 6. Filter books based on dropdown
const filterSelect = document.getElementById("filter");
filterSelect.addEventListener("change", function () {
  const selected = filterSelect.value;
  if (selected === "all") {
    displayBooks();
  } else {
    const filtered = books.filter(book => book.status === selected);
    displayBooks(filtered);
  }
});

// --- 7. Initial display
displayBooks();

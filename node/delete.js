const express = require('express');
const app = express();
const port = 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Simulando um "banco de dados"
let books = [
    { id: 1, title: 'Livro 1' },
    { id: 2, title: 'Livro 2' },
    { id: 3, title: 'Livro 3' }
];

app.get('/books', (req, res) => {
    res.json(books)
});

app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req,params.id);

    const indexToRemove = books.findIndex(book => book.id === bookId);

   if (indexToRemove !== -1) {
    const removedBook = books.splice(indexToRemove, 1);
    res.json(removedBook[0]);
   } else {
    res.status(404).send('Livro não encontrado');
   }
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:$(port}');
});
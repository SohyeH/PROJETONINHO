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
// Rota para o método PUT
app.put('/update-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:$(port}');
});
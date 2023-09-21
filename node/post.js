const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Simulando um "banco de dados"
let books = [
    { id: 1, title: 'Livro 1' },
    { id: 2, title: 'Livro 2' },
    { id: 3, title: 'Livro 3 ' }
];

// Rota para obter todos os livros (método GET)
app.get('/books', (req, res) => {
    res.json(books);
});

// Rota para adicionar um novo livro (método POST)
app.post('/post-exemple', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost: ${port}');
});
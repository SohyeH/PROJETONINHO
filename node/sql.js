const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'samara'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao MyDQL: ' + err.message);
    } else {
        console.log('Conectado ao MySQL');
    }
});

app.use(express.urlencoded({extended: true }));
app.use(express.json());

//Get
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar registros:' + err.message);
            res.status(500).json({ error: 'Erro ao buscar resgistros' });
        } else {
            res.status(200).json(results);
        }
    });
});

//Post
app.post('/api/usuarios', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';
    connection.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir registro: ' + err.message);
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso ' });
        }
    });
});

//Rota para lidar com o método PUT para atualizar um usuário
app.put('/api/usuario/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

    //Atualizar os dados na tabela 'usuario' no banco de dados usando uma
    const sql = 'UPDATE usuario SET email = ?, senha = ? WHERE id = ?';
    connection.query(sql, [email, senha, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar registro ' + err.message);
            res.status(500).json({ error: 'Erro ao atualizar registro' });
        } else {
            console.log('Registro atualizado com sucesso!');
            res.status(200).json({ message: 'Registro atualizado com sucesso' });
        }
    });
});


//Delete
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

    // Excluir o registro na tabela 'usuario' no banco de dados pelo ID
    const sql = 'DELETE FROM usuario WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao exlcuir registro: ' + erro.message);
            res.status(500).json({ error: 'Erro ao excluir registro' });
        } else {
            if(result.affectedRows > 0) {
                console.log('Registre excluído com sucesso!');
                res.status(200).json({message: 'Registro excluído com sucesso' });
            } else {
                console.log('Registro não encontrado.');
                res.status(404).json({ message: 'Registro não ecnontrado '});

            }
        }
    });
});

app.get('/books', (req, res) => {
    res.json(books);
})

app.post('/post-example', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

app.listen(port, () => {
    console.log('Servidor rodando na porta' + port)
});
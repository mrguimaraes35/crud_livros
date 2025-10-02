const express = require('express')
const router = express.Router()

// Lista de livros (simulando banco de dados)
let livros = [
    { id: 1, titulo: "Dom Casmurro", autorId: 1, ano: 1899, genero: "Romance" },
    { id: 2, titulo: "O Hobbit", autorId: 2, ano: 1937, genero: "Fantasia" }
]

// Criar livro
router.post('/livros', (req, res) => {
    const { titulo, autorId, ano, genero } = req.body
    if(!titulo || !autorId || !ano || !genero){
        return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const novoLivro = { id: Date.now(), titulo, autorId, ano, genero }
    livros.push(novoLivro)
    res.status(201).json({ message: "Livro cadastrado com sucesso!", novoLivro })
})

// Listar todos
router.get('/livros', (req, res) => {
    res.json(livros)
})

// Buscar por id
router.get('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id))
    if(!livro) return res.status(404).json({ error: "Livro não encontrado" })
    res.json(livro)
})

// Atualizar
router.put('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id))
    if(!livro) return res.status(404).json({ error: "Livro não encontrado" })

    const { titulo, autorId, ano, genero } = req.body
    if(!titulo || !autorId || !ano || !genero){
        return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    livro.titulo = titulo
    livro.autorId = autorId
    livro.ano = ano
    livro.genero = genero

    res.json({ message: "Livro atualizado com sucesso!", livro })
})

// Deletar
router.delete('/livros/:id', (req, res) => {
    livros = livros.filter(l => l.id !== parseInt(req.params.id))
    res.json({ message: "Livro removido com sucesso!" })
})

module.exports = router

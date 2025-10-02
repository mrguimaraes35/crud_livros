const express = require('express')
const router = express.Router()

let autores = [
    { id: 1, nome: "Machado de Assis", nacionalidade: "Brasileiro" },
    { id: 2, nome: "J.R.R. Tolkien", nacionalidade: "Britânico" }
]

router.post('/autores', (req, res) => {
    const { nome, nacionalidade } = req.body
    if(!nome || !nacionalidade){
        return res.status(400).json({ error: "Nome e nacionalidade são obrigatórios" })
    }

    const novoAutor = { id: Date.now(), nome, nacionalidade }
    autores.push(novoAutor)
    res.status(201).json({ message: "Autor cadastrado!", novoAutor })
})

router.get('/autores', (req, res) => res.json(autores))

router.get('/autores/:id', (req, res) => {
    const autor = autores.find(a => a.id === parseInt(req.params.id))
    if(!autor) return res.status(404).json({ error: "Autor não encontrado" })
    res.json(autor)
})

router.put('/autores/:id', (req, res) => {
    const autor = autores.find(a => a.id === parseInt(req.params.id))
    if(!autor) return res.status(404).json({ error: "Autor não encontrado" })

    const { nome, nacionalidade } = req.body
    autor.nome = nome
    autor.nacionalidade = nacionalidade
    res.json({ message: "Autor atualizado!", autor })
})

router.delete('/autores/:id', (req, res) => {
    autores = autores.filter(a => a.id !== parseInt(req.params.id))
    res.json({ message: "Autor removido!" })
})

module.exports = router

const express = require('express')
const router = express.Router()

let usuarios = [
    { id: 1, nome: "Ana", email: "ana@email.com" },
    { id: 2, nome: "João", email: "joao@email.com" }
]

router.post('/usuarios', (req, res) => {
    const { nome, email } = req.body
    if(!nome || !email) return res.status(400).json({ error: "Nome e email são obrigatórios" })

    const novoUsuario = { id: Date.now(), nome, email }
    usuarios.push(novoUsuario)
    res.status(201).json({ message: "Usuário cadastrado!", novoUsuario })
})

router.get('/usuarios', (req, res) => res.json(usuarios))

router.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id))
    if(!usuario) return res.status(404).json({ error: "Usuário não encontrado" })
    res.json(usuario)
})

router.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id))
    if(!usuario) return res.status(404).json({ error: "Usuário não encontrado" })

    const { nome, email } = req.body
    usuario.nome = nome
    usuario.email = email
    res.json({ message: "Usuário atualizado!", usuario })
})

router.delete('/usuarios/:id', (req, res) => {
    usuarios = usuarios.filter(u => u.id !== parseInt(req.params.id))
    res.json({ message: "Usuário removido!" })
})

module.exports = router

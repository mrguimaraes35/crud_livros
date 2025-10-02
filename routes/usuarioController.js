const express = require('express')
const router = express.Router()

let usuarios = [
  { id: 1, nome: "Mateus", email: "mateus@example.com" }
]

// CRIAR
router.post('/usuarios', (req, res) => {
  const { nome, email } = req.body

  if(!nome || !email){
    return res.status(400).json({ error: "Nome e e-mail são obrigatórios" })
  }

  const usuarioExistente = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
  if(usuarioExistente){
    return res.status(409).json({ error: "E-mail já cadastrado" })
  }

  const novoUsuario = { id: Date.now(), nome, email }
  usuarios.push(novoUsuario)

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", novoUsuario })
})

// LISTAR
router.get('/usuarios', (req, res) => res.json(usuarios))

// BUSCAR POR ID
router.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const usuario = usuarios.find(u => u.id === id)

  if(!usuario){
    return res.status(404).json({ error: "Usuário não encontrado" })
  }

  res.json(usuario)
})

// ATUALIZAR
router.put('/usuarios/:id', (req, res) => {
  const { nome, email } = req.body
  const id = parseInt(req.params.id)
  const usuario = usuarios.find(u => u.id === id)

  if(!usuario){
    return res.status(404).json({ error: "Usuário não encontrado" })
  }

  usuario.nome = nome || usuario.nome
  usuario.email = email || usuario.email

  res.json({ message: "Usuário atualizado com sucesso!", usuario })
})

// DELETAR
router.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const usuario = usuarios.find(u => u.id === id)

  if(!usuario){
    return res.status(404).json({ error: "Usuário não encontrado" })
  }

  usuarios = usuarios.filter(u => u.id !== id)
  res.json({ message: "Usuário excluído com sucesso!" })
})

module.exports = router

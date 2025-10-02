const express = require('express')
const router = express.Router()

let livros = [
  { id: 1, titulo: "Harry Potter", autor: "J. K. Rowling", ano: 1997, disponivel: true },
  { id: 2, titulo: "A Guerra dos Tronos", autor: "George R. R. Martin", ano: 1996, disponivel: true }
]

// CRIAR LIVRO
router.post('/livros', (req, res) => {
  const { titulo, autor, ano } = req.body

  if(!titulo || !autor){
    return res.status(400).json({ error: "Título e autor são obrigatórios" })
  }

  const livroExistente = livros.find(l => l.titulo.toLowerCase() === titulo.toLowerCase())
  if(livroExistente){
    return res.status(409).json({ error: "Livro já cadastrado" })
  }

  const novoLivro = { id: Date.now(), titulo, autor, ano: ano || null, disponivel: true }
  livros.push(novoLivro)

  res.status(201).json({ message: "Livro cadastrado com sucesso!", novoLivro })
})

// LISTAR
router.get('/livros', (req, res) => res.json(livros))

// BUSCAR POR ID
router.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const livro = livros.find(l => l.id === id)

  if(!livro){
    return res.status(404).json({ error: "Livro não encontrado" })
  }

  res.json(livro)
})

// ATUALIZAR
router.put('/livros/:id', (req, res) => {
  const { titulo, autor, ano, disponivel } = req.body
  const id = parseInt(req.params.id)
  const livro = livros.find(l => l.id === id)

  if(!livro){
    return res.status(404).json({ error: "Livro não encontrado" })
  }

  livro.titulo = titulo || livro.titulo
  livro.autor = autor || livro.autor
  livro.ano = ano || livro.ano
  livro.disponivel = disponivel !== undefined ? disponivel : livro.disponivel

  res.json({ message: "Livro atualizado com sucesso!", livro })
})

// DELETAR
router.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const livro = livros.find(l => l.id === id)

  if(!livro){
    return res.status(404).json({ error: "Livro não encontrado" })
  }

  livros = livros.filter(l => l.id !== id)
  res.json({ message: "Livro excluído com sucesso!" })
})

module.exports = router

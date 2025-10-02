const express = require('express')
const router = express.Router()

let autores = [
  { id: 1, nome: "J. K. Rowling", bio: "Autora britânica famosa por Harry Potter" },
  { id: 2, nome: "George R. R. Martin", bio: "Autor da saga Game of Thrones" }
]

// CRIAR AUTOR
router.post('/autores', (req, res) => {
  const { nome, bio } = req.body

  if(!nome){
    return res.status(400).json({ error: "O campo nome é obrigatório" })
  }

  const autorExistente = autores.find(a => a.nome.toLowerCase() === nome.toLowerCase())
  if(autorExistente){
    return res.status(409).json({ error: "Autor já cadastrado" })
  }

  const novoAutor = { id: Date.now(), nome, bio: bio || "" }
  autores.push(novoAutor)

  res.status(201).json({ message: "Autor cadastrado com sucesso!", novoAutor })
})

// LISTAR
router.get('/autores', (req, res) => res.json(autores))

// BUSCAR POR ID
router.get('/autores/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const autor = autores.find(a => a.id === id)

  if(!autor){
    return res.status(404).json({ error: "Autor não encontrado" })
  }

  res.json(autor)
})

// ATUALIZAR
router.put('/autores/:id', (req, res) => {
  const { nome, bio } = req.body
  const id = parseInt(req.params.id)
  const autor = autores.find(a => a.id === id)

  if(!autor){
    return res.status(404).json({ error: "Autor não encontrado" })
  }

  autor.nome = nome || autor.nome
  autor.bio = bio || autor.bio

  res.json({ message: "Autor atualizado com sucesso!", autor })
})

// DELETAR
router.delete('/autores/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const autor = autores.find(a => a.id === id)

  if(!autor){
    return res.status(404).json({ error: "Autor não encontrado" })
  }

  autores = autores.filter(a => a.id !== id)
  res.json({ message: "Autor excluído com sucesso!" })
})

module.exports = router
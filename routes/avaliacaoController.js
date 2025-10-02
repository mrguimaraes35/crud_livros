const express = require('express')
const router = express.Router()

let avaliacoes = [
  // { id, livroId, usuarioId, nota, comentario }
]

// CRIAR
router.post('/avaliacoes', (req, res) => {
  const { livroId, usuarioId, nota, comentario } = req.body

  if(!livroId || !usuarioId || !nota){
    return res.status(400).json({ error: "livroId, usuarioId e nota são obrigatórios" })
  }

  if(nota < 1 || nota > 5){
    return res.status(400).json({ error: "A nota deve estar entre 1 e 5" })
  }

  const novaAvaliacao = { id: Date.now(), livroId, usuarioId, nota, comentario: comentario || "" }
  avaliacoes.push(novaAvaliacao)

  res.status(201).json({ message: "Avaliação cadastrada com sucesso!", novaAvaliacao })
})

// LISTAR
router.get('/avaliacoes', (req, res) => res.json(avaliacoes))

// BUSCAR POR ID
router.get('/avaliacoes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const avaliacao = avaliacoes.find(a => a.id === id)

  if(!avaliacao){
    return res.status(404).json({ error: "Avaliação não encontrada" })
  }

  res.json(avaliacao)
})

// DELETAR
router.delete('/avaliacoes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const avaliacao = avaliacoes.find(a => a.id === id)

  if(!avaliacao){
    return res.status(404).json({ error: "Avaliação não encontrada" })
  }

  avaliacoes = avaliacoes.filter(a => a.id !== id)
  res.json({ message: "Avaliação excluída com sucesso!" })
})

module.exports = router
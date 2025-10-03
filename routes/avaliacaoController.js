const express = require('express')
const router = express.Router()

let avaliacoes = [
    { id: 1, livroId: 1, usuarioId: 1, nota: 5, comentario: "Excelente!" }
]

router.post('/avaliacoes', (req, res) => {
    const { livroId, usuarioId, nota, comentario } = req.body
    if(!livroId || !usuarioId || !nota) {
        return res.status(400).json({ error: "livroId, usuarioId e nota são obrigatórios" })
    }

    const novaAvaliacao = { id: Date.now(), livroId, usuarioId, nota, comentario }
    avaliacoes.push(novaAvaliacao)
    res.status(201).json({ message: "Avaliação cadastrada!", novaAvaliacao })
})

router.get('/avaliacoes', (req, res) => res.json(avaliacoes))

router.get('/avaliacoes/:id', (req, res) => {
    const avaliacao = avaliacoes.find(avaliacoes => avaliacoes.id === parseInt(req.params.id))
    if(!avaliacao) return res.status(404).json({ error: "Avaliação não encontrada" })
    res.json(avaliacao)
})

router.delete('/avaliacoes/:id', (req, res) => {
    avaliacoes = avaliacoes.filter(avaliacoes => avaliacoes.id !== parseInt(req.params.id))
    res.json({ message: "Avaliação removida!" })
})

module.exports = router

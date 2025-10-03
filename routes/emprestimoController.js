const express = require('express')
const router = express.Router()

let emprestimos = [
    { id: 1, livroId: 1, usuarioId: 2, dataEmprestimo: "2025-10-01", dataDevolucao: null }
]

router.post('/emprestimos', (req, res) => {
    const { livroId, usuarioId, dataEmprestimo } = req.body
    if(!livroId || !usuarioId || !dataEmprestimo){
        return res.status(400).json({ error: "livroId, usuarioId e dataEmprestimo são obrigatórios" })
    }

    const novoEmprestimo = { 
        id: Date.now(), 
        livroId, 
        usuarioId, 
        dataEmprestimo, 
        dataDevolucao: null 
    }

    emprestimos.push(novoEmprestimo)
    res.status(201).json({ message: "Empréstimo registrado!", novoEmprestimo })
})

router.get('/emprestimos', (req, res) => res.json(emprestimos))

router.get('/emprestimos/:id', (req, res) => {
    const emprestimo = emprestimos.find(emprestimo => emprestimo.id === parseInt(req.params.id))
    if(!emprestimo) return res.status(404).json({ error: "Empréstimo não encontrado" })
    res.json(emprestimo)
})

router.put('/emprestimos/:id', (req, res) => {
    const emprestimo = emprestimos.find(emprestimo => emprestimo.id === parseInt(req.params.id))
    if(!emprestimo) return res.status(404).json({ error: "Empréstimo não encontrado" })

    emprestimo.dataDevolucao = new Date().toISOString().split("T")[0]
    res.json({ message: "Livro devolvido!", emprestimo })
})

module.exports = router

const express = require('express')
const router = express.Router()

let emprestimos = [
  // { id, livroId, usuarioId, status, dataEmprestimo, dataDevolucao }
]

// CRIAR (emprestar livro)
router.post('/emprestimos', (req, res) => {
  const { livroId, usuarioId } = req.body

  if(!livroId || !usuarioId){
    return res.status(400).json({ error: "livroId e usuarioId são obrigatórios" })
  }

  const novoEmprestimo = {
    id: Date.now(),
    livroId,
    usuarioId,
    status: "ativo",
    dataEmprestimo: new Date().toLocaleString(),
    dataDevolucao: null
  }

  emprestimos.push(novoEmprestimo)
  res.status(201).json({ message: "Empréstimo cadastrado com sucesso!", novoEmprestimo })
})

// LISTAR
router.get('/emprestimos', (req, res) => res.json(emprestimos))

// DEVOLVER LIVRO
router.put('/emprestimos/:id/devolver', (req, res) => {
  const id = parseInt(req.params.id)
  const emprestimo = emprestimos.find(e => e.id === id)

  if(!emprestimo){
    return res.status(404).json({ error: "Empréstimo não encontrado" })
  }

  emprestimo.status = "finalizado"
  emprestimo.dataDevolucao = new Date().toLocaleString()

  res.json({ message: "Livro devolvido com sucesso!", emprestimo })
})

module.exports = router

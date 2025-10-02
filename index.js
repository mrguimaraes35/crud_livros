const express = require('express')
const app = express()
const cors = require('cors')

// Middleware para habilitar CORS
app.use(cors())

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json())

// LOG de todas as requisições
app.use((req, res, next) => {
    console.log("####### LOG de Requisição ######")
    console.log("Time: ", new Date().toLocaleString())
    console.log("Método: ", req.method)
    console.log("Rota: ", req.url)
    next()
})

// ==============================
// Importando os controladores
// ==============================
const livroController = require('./routes/livroController')
app.use(livroController)

const autorController = require('./routes/autorController')
app.use(autorController)

const usuarioController = require('./routes/usuarioController')
app.use(usuarioController)

const avaliacaoController = require('./routes/avaliacaoController')
app.use(avaliacaoController)

const emprestimoController = require('./routes/emprestimoController')
app.use(emprestimoController)


app.listen(3000, () => {
    console.log("API da Biblioteca rodando em http://localhost:3000")
})
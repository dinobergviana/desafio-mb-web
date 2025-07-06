import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.get("/registration", (request, response) => {
  response.json({
    message: "OK!",
    statusCode: 200
  })
})

app.post("/registration", (request, response) => {
  const fieldsWithError = []
  const requestBodyKeys = Object.keys(request.body)

  if (requestBodyKeys.length === 0) {
    return response.status(400).json({
      message: "Preencha os campos do formulário.",
      statusCode: 400
    })
  }

  for (let key in request.body) {
    if (!request.body[key]) {
      fieldsWithError.push(key)
    }
  }

  if (fieldsWithError.length > 0) {
    return response.status(400).json({
      message: "Preencha os seguintes campos",
      data: fieldsWithError,
      statusCode: 400
    })
  }

  const data = {
    id: 1, // esse id poderia ser dinamico e gerado por um banco de dados
    ...request.body
  }

  response.status(201).json({
    message: "Usuario criado com sucesso!",
    data,
    statusCode: 201
  })
})

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`))

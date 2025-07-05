import express from "express"

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/registration", (request, response) => {
  response.json({
    message: "Registration endpoint is working!",
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

  response.json({
    message: "Usuario criado com sucesso!",
    statusCode: 201
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))

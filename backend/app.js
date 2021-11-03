// arquivo renomeado: rotas.js => app.js
const express = require('express')
const app = express()
const cors = require('cors')

const { getCpfInfo, getClinicasInfo } = require('./dbBanco')

app.use(cors())

app.use(express.json())

// Serve todos os arquivos na pasta "html" usando express.static
// Sintaxe: app.use('rota/principal/onde/vai/ser/servido', funcaoDaRota())
app.use('/', express.static('../html/'))

app.get("/api/cpf/:cpf", async function (request, response) {
	const { cpf } = request.params

	// Grava na base o cpf capturado na requisição

	try {
		const cpfInfo = await getCpfInfo(cpf)

		if (!cpfInfo) {
			return response.status(400).json({
				message: "CPF não encontrado"
			})
		}

		return response.json(cpfInfo)
	}
	catch (error) {
		return response.status(500).json({
			message: `Erro ao buscar cpf`,
			error
		})
	}
})

app.get("/api/clinicas", async (request, response) => {
	try{
		const clinicas = await getClinicasInfo()

		return response.json(clinicas)
	}
	catch(error){
		return response.status(500).json({
			message: "Não foi possivel encontrar as Clinicas",
			error
		})
	}
})

app.listen(8081, function () {
	console.log("Servidor rodando url http://localhost:8081");
});

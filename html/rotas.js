const express = require('express')
const app = express()
const cors = require('cors')

const { getCpfInfo, getClinicasInfo } = require('./dbBanco')

app.use(cors())

app.use(express.json())

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/dbBanco.js", function (req, res) {
	res.sendFile(__dirname + "/dbBanco.js");
});
app.get("/index.js", function (req, res) {
	res.sendFile(__dirname + "/index.js");
});

app.get("/bundle.js", function (req, res) {
	res.sendFile(__dirname + "/bundle.js");
});

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

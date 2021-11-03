require('dotenv').config()

var sql = require('mssql');


// Cria configuração do mssql
var config = {
	server: process.env.DB_SERVER || 'localhost',
	database: process.env.DB_BASE || 'projeto_exames',
	user: process.env.DB_USER || '',
	password: process.env.DB_PASS || '',
	port: process.env.DB_PORT || 38000,
	synchronize: true,
	options: {
		trustServerCertificate: true // Confiar em certificado auto-assinado
	}
}


async function getCpfInfo(cpf) {
	try {
		await sql.connect(config);

		const result = await sql.query(`select a.chapa, a.codpessoa from pfunc as a 
		 inner join ppessoa as b on (a.codpessoa = b.CODIGO)
		where b.cpf ='${cpf}'
		and a.codsituacao <> 'D'`)

		return await result.recordset[0]
	}
	catch (error) {
		throw error
	}
}
async function getClinicasInfo() {
	try {

		await sql.connect(config);

		const resultClinicas = await sql.query(`select codentidade, razaosocial from ventidades
		where codgrupoentidade = 1`)
		console.log(resultClinicas.recordset)
		return resultClinicas.recordset
		
	}
	catch (error) {
		throw error
	}
}

module.exports = {
	getCpfInfo,
	getClinicasInfo
}
require('dotenv').config()
/*import {
    queryCPF
  } from './index.js'*/

  
//var indexJS = require ('./index')
var dbConn;

 var sql = require('mssql');


//set up a sql server credentials
var config = {
server: process.env.DB_SERVER||'localhost',
database: process.env.DB_BASE||'projeto_exames',
user: process.env.DB_USER||'',
password: process.env.DB_PASS||'',
port: process.env.DB_PORT||38000,
synchronize: true,
options: {
  trustServerCertificate: true // change to true for local dev / self-signed certs
}


};

 async function getCpfInfo(cpf){
  try{
    // dbConn = new sql.ConnectionPool(config);
    await sql.connect(config);

    // console.log("conectado")
    //  dbConn.query(`select a.chapa from pfunc as a 
    //  inner join ppessoa as b on (a.codpessoa = b.CODIGO)
    // where b.cpf ='${cpf}'
    // and a.codsituacao <> 'D'`, function (err, recordset) {
    // if (err) console.log(err)
    // // send records as a response
    
    // dadosChapa = recordset.recordset[0].chapa;
    // console.log(recordset)
    
    // //res.send(recordset);
    // })
    const result = await sql.query(`select a.chapa, a.codpessoa from pfunc as a 
     inner join ppessoa as b on (a.codpessoa = b.CODIGO)
    where b.cpf ='${cpf}'
    and a.codsituacao <> 'D'`)

    return await result.recordset[0]
}
  catch(error){
    throw error
  }
 }
 async function getClinicaInfo(cpf){
  try{
    
    await sql.connect(config);

    const resultClinica = await sql.query(`select codentidade, razaosocial from ventidades
    where codgrupoentidade = 1`)

    return await result.recordset[0]
}
  catch(error){
    throw error
  }
 }
 
 module.exports = {
   getCpfInfo,
   getClinicaInfo
 }
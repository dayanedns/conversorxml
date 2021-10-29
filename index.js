

let  queryCPF="";
let aux2=""
//let dbConn;

//funcao para download do arquivo

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
          
  //funcao para captura dos dados

  let codTpEsocial, capCodCons = "", capApto = "", capCodConsulta="" ;
  
  function capturar () {
  
      capCodConsulta = document.getElementById('codConsulta').value;
      capApto = document.querySelector('input[name=op]:checked').value;
      
      capCodCons = document.getElementById('browser').value;
      if (capCodCons == "01 - Admissional"){
          capCodCons = "01";
          codTpEsocial = "A";
      }else 
      if (capCodCons == "02 - Periodico"){
          capCodCons = "02";
          codTpEsocial = "P";
      }else
      if (capCodCons == "03 - Demissional"){
          capCodCons = "03";
          codTpEsocial = "D";
      }else
      if (capCodCons == "04 - Mudança de função"){
          capCodCons = "04";
          codTpEsocial = "M";
      }else
      if (capCodCons == "05 - Retorno ao Trabalho"){
          capCodCons = "05";
          codTpEsocial = "R";
       } else
      if (capCodCons == "06 - Mudança de contrato"){
          capCodCons = "06";
          codTpEsocial = "M";
      }
   
  } 
 
   //funcao para ler o xml
   var text, parser, xmldoc;
   window.onload = function () {
       //Check the support for the File API support
       if (window.File && window.FileReader && window.FileList && window.Blob) {
           var fileSelected = document.getElementById('xmlfile');

           let xmlContent = '';
           console.log(fileSelected.files)
           fileSelected.addEventListener('change', function (e) {
               //Set the extension for the file
               var fileExtension = /xml.*/;
               //Get the file object
               var fileTobeRead = fileSelected.files[0];

               //Check of the extension match
               if (fileTobeRead.type.match(fileExtension)) {
                   //Initialize the FileReader object to read the 2file
                   var fileReader = new FileReader();
                   fileReader.onload = function (e) {
                       var fileContents = document.getElementById('filecontents');
                       fileContents.innerText = fileReader.result;
                       text = fileReader.result;

                       parser = new DOMParser();
                       xmldoc = parser.parseFromString(text, "text/xml");

                       let dadosDtAso= xmldoc.querySelectorAll("dtAso");
                    let resultDtAso =   document.getElementById("dtAso").value = dadosDtAso[0].innerHTML;
                    /*   let dadosNmMed= xmldoc.querySelectorAll("nmMed");
                       document.getElementById("nmMed").value = dadosNmMed[0].innerHTML;*/
                     let dadosNrCRM= xmldoc.querySelectorAll("nrCRM");
                     let resultCodMed =  document.getElementById("nrCRM").value = dadosNrCRM[0].innerHTML;

                       let dtExm = xmldoc.querySelectorAll("dtExm");
                       let i;
                       let procRealizado = xmldoc.querySelectorAll("procRealizado");

                       var xmlTotvs =  '<?xml version="1.0" encoding="ISO-8859-1" ?>'+
                       "<REGISTRO>"+
                       "<CONSULTA>"+
                       "<IDCONSULTA></IDCONSULTA>"+
                       "<CODENTIDADE></CODENTIDADE>"+
                       "<CODCONSULTA>"+capCodConsulta+"</CODCONSULTA>"+
                       "<CODPESSOA></CODPESSOA>"+
                       "<CHAPA></CHAPA>"+
                       "<CODMEDICO>"+ resultCodMed +"</CODMEDICO>"+
                       "<CODTIPOCONSULTA>"+capCodCons+"</CODTIPOCONSULTA>"+
                       "<CODTIPOCONSULTAESOCIAL>"+codTpEsocial+"</CODTIPOCONSULTAESOCIAL>"+
                       "<DATACONSULTA>"+resultDtAso+"</DATACONSULTA>"+
                       "<APTO>"+capApto+"</APTO>"+
                       "<DATAASO>"+resultDtAso+"</DATAASO>"+
                       "<OBSERVACAO></OBSERVACAO>"+
                       "</CONSULTA>"

                     //  let aux;
                       
                      // console.log(xmlTotvs)
                       var aux = "";
                       let resultProcRealiz,resultDtExm,xmlResultTotvs;
                       for (i = 0; i < dtExm.length; i++) {
                        /*   var txtExm = document.createElement("text");
                           txtExm.innerHTML = '<div class=left><h4>Exame '+i+'</h4></div>';
                           document.body.appendChild(txtExm);

                           var txtDtExm = document.createElement("text");
                           txtDtExm.innerHTML = '<div class="left">Data do Exame</div>';
                           document.body.appendChild(txtDtExm);*/

                           var input = document.createElement("text");
                           input.innerHTML = '<input type=hidden id=exm' + i +'>';
                           document.body.appendChild(input);
                            resultDtExm =  document.getElementById('exm'+ i).value = dtExm[i].innerHTML;

                          /* var txtProcRealizado = document.createElement("text");
                           txtProcRealizado.innerHTML = '<div class="left">Procedimento Realizado</div>';
                           document.body.appendChild(txtProcRealizado);*/

                           var inputProc = document.createElement("text");
                          inputProc.innerHTML = '<input type=hidden id=procRealizado' + i +'>';
                           document.body.appendChild(inputProc);
                           resultProcRealiz= document.getElementById('procRealizado'+ i).value = procRealizado[i].innerHTML;
                           
                        xmlResultTotvs =  "<RESULTADO>"+
                       "<IDCONSULTA></IDCONSULTA>"+
                       "<CODCONSULTA>"+capCodConsulta+"</CODCONSULTA>"+
                       "<EXAME></EXAME>"+
                       "<TIPOEXAME></TIPOEXAME>"+
                       "<CID></CID>"+
                       "<CODENTIDADE></CODENTIDADE>"+
                       "<DATAEXAME>"+resultDtExm+"</DATAEXAME>"+
                       "<EXAMEREFERENCIAL></EXAMEREFERENCIAL>"+
                       "<ATIVOOCUPACIONAL></ATIVOOCUPACIONAL>"+
                       "<RESULTNORMAL></RESULTNORMAL>"+
                       "<TIPOANORMALIDADE></TIPOANORMALIDADE>"+
                       "<APTO></APTO>"+
                       "<DESCANORMAL></DESCANORMAL>"+
                       "<OBSERVACAO></OBSERVACAO>"+
                       "<CODLAUDOEXAME></CODLAUDOEXAME>"+
                       "<CODPROCEDMENTO>"+resultProcRealiz+"</CODPROCEDMENTO>"+
                       "<CAMPOTEXTOLONGO></CAMPOTEXTOLONGO>"+
                       "<CAMPONUMERICO></CAMPONUMERICO>"+
                       "<CAMPOTEXTO></CAMPOTEXTO>"+
                       "<CAMPOTABDINAM></CAMPOTABDINAM>"+
                       "</RESULTADO>"+
                       "</REGISTRO>"

                      aux = aux+xmlResultTotvs;
                       }           
                
                      
                      document.getElementById('txtArea').value = xmlTotvs+aux;
                   
                      
                      let   dadosCPF= xmldoc.querySelectorAll("cpfTrab");
                      queryCPF =  document.getElementById("cpfTrab").value = dadosCPF[0].innerHTML;
                      
                      export {queryCPF};

                      console.log(queryCPF)
                      
                     // var sql = require('mssql');
                     //var config = require('config')
                    
              
    
                
                         //    funcionario = recordset.recordset
                        
                       
                      //console.log(document.getElementById('txtArea').value = xmlTotvs+aux

                      }  
                      
                       fileReader.readAsText(fileTobeRead);
                       
           }
               else {
                       alert("Por favor selecione arquivo texto");
                   }

               }, false);
       }
       else {
           alert("Arquivo(s) não suportado(s)");
       }
   }
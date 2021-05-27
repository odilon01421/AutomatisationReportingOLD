/**
 * Contentieux.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const path_reporting = 'D:/LDR8_1421_nouv/PROJET_FELANA/REPORTING CONTENTIEUX type.xlsx';

module.exports = {
  attributes: {
  },
  // Récuperer nombre OK ou KO
  countOkKo : function (table, callback) {
    const Excel = require('exceljs');
    var sqlOk ="select count(okko) as ok from "+table+" where okko='OK'"; //trameFlux
    var sqlKo ="select count(okko) as ko from "+table+" where okko='KO'";
    console.log(sqlOk);
    console.log(sqlKo);
    async.series([
      function (callback) {
        Contentieux.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Contentieux.query(sqlKo, function(err, resKo){
          if (err) return res.badRequest(err);
          callback(null, resKo.rows[0].ko);
        });
      },
    ],function(err,result){
      if(err) return res.badRequest(err);
      console.log("Count OK ==> " + result[0]);
      console.log("Count KO ==> " + result[1]);
      var okko = {};
      okko.ok = result[0];
      okko.ko = result[1];
      return callback(null, okko);
    })
  },
 
  // Convert date
  convertDate : function (dateExcel){
    var date = new Date(dateExcel);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return dt +"/"+ month +"/"+year;
  },
 
 ecritureOkKo : async function (nombre_ok_ko, table,date_export,mois1,callback) {
    const Excel = require('exceljs');
    const cmd=require('node-cmd');
    const newWorkbook = new Excel.Workbook();
    
    try{
    
            
      await newWorkbook.xlsx.readFile(path_reporting);
    const newworksheet = newWorkbook.getWorksheet(mois1);
    var colonneDate = newworksheet.getColumn('A');
    var ligneDate1;
    var ligneDate;
    colonneDate.eachCell(function(cell, rowNumber) {
      var dateExcel = Contentieux.convertDate(cell.text);
      if(dateExcel==date_export)
      {
        ligneDate1 = parseInt(rowNumber);
        var line = newworksheet.getRow(ligneDate1);
        var f = line.getCell(3).value;
        //console.log();
        if(f == "CBTP")
        {
          ligneDate = parseInt(rowNumber);
        }
      }
    });
    console.log("LIGNE DATE ===> "+ ligneDate);
    var rowDate = newworksheet.getRow(ligneDate);
    var numeroLigne = rowDate;
    var iniValue = Contentieux.getIniValue(table);
    
    var a5;

    var rowm = newworksheet.getRow(1);
    var colonnne;
    var colDate1;
    rowm.eachCell(function(cell, colNumber) {
      if(cell.value == 'DOCUMENTS SAISIS')
      {
        colDate1 = parseInt(colNumber);
        
        //var col = newworksheet.getColumn(colDate1);
        var man = newworksheet.getRow(3);
        var f = man.getCell(colDate1).value;
        var getko_ini = man.getCell(colDate1).address;
        if(getko_ini == iniValue.ko+3 && f == iniValue.ok)
        {
          colonnne = parseInt(colNumber);
        }
        }
    });
    console.log(" Colnumber"+colonnne);
   
    numeroLigne.getCell(colonnne).value = nombre_ok_ko.ok;
    await newWorkbook.xlsx.writeFile(path_reporting);
    sails.log("Ecriture OK KO terminé"); 
    return callback(null, "OK");
  
    }
    catch
    {
      console.log("Une erreur s'est produite");
      Reportinghtp.deleteToutHtp(table,3,callback);
    }
    },
/********************************************************************/
ecritureOkKo2 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
  const Excel = require('exceljs');
  const cmd=require('node-cmd');
  const newWorkbook = new Excel.Workbook();
  
  try{
  
          
    await newWorkbook.xlsx.readFile(path_reporting);
  const newworksheet = newWorkbook.getWorksheet(mois1);
  var colonneDate = newworksheet.getColumn('A');
  var ligneDate1;
  var ligneDate;
  colonneDate.eachCell(function(cell, rowNumber) {
    var dateExcel = Contentieux.convertDate(cell.text);
    if(dateExcel==date_export)
    {
      ligneDate1 = parseInt(rowNumber);
      var line = newworksheet.getRow(ligneDate1);
      var f = line.getCell(3).value;
      //console.log();
      if(f == "ALMERYS")
      {
        ligneDate = parseInt(rowNumber);
      }
    }
  });
  console.log("LIGNE DATE ===> "+ ligneDate);
  var rowDate = newworksheet.getRow(ligneDate);
  var numeroLigne = rowDate;
  var iniValue = Contentieux.getIniValue(table);
  
  var a5;

  var rowm = newworksheet.getRow(1);
  var colonnne;
  var colDate1;
  rowm.eachCell(function(cell, colNumber) {
    if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
    {
      colDate1 = parseInt(colNumber);
      
      //var col = newworksheet.getColumn(colDate1);
      var man = newworksheet.getRow(3);
      var f = man.getCell(colDate1).value;
      var getko_ini = man.getCell(colDate1).address;
      if(getko_ini == iniValue.ko+3 && f == iniValue.ok)
      {
        colonnne = parseInt(colNumber);
      }
      }
  });
  console.log(" Colnumber"+colonnne);
 
  numeroLigne.getCell(colonnne).value = nombre_ok_ko.ok;
  await newWorkbook.xlsx.writeFile(path_reporting);
  sails.log("Ecriture OK KO terminé"); 
  return callback(null, "OK");

  }
  catch
  {
    console.log("Une erreur s'est produite");
    Reportinghtp.deleteToutHtp(table,3,callback);
  }
  },
/********************************************************************/
ecritureOkKo3 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
  const Excel = require('exceljs');
  const cmd=require('node-cmd');
  const newWorkbook = new Excel.Workbook();
  
  try{
  
          
    await newWorkbook.xlsx.readFile(path_reporting);
  const newworksheet = newWorkbook.getWorksheet(mois1);
  var colonneDate = newworksheet.getColumn('A');
  var ligneDate1;
  var ligneDate;
  colonneDate.eachCell(function(cell, rowNumber) {
    var dateExcel = Contentieux.convertDate(cell.text);
    if(dateExcel==date_export)
    {
      ligneDate1 = parseInt(rowNumber);
      var line = newworksheet.getRow(ligneDate1);
      var f = line.getCell(3).value;
      //console.log();
      if(f == "CBTP")
      {
        ligneDate = parseInt(rowNumber);
      }
    }
  });
  console.log("LIGNE DATE ===> "+ ligneDate);
  var rowDate = newworksheet.getRow(ligneDate);
  var numeroLigne = rowDate;
  var iniValue = Contentieux.getIniValue(table);
  
  var a5;

  var rowm = newworksheet.getRow(1);
  var colonnne;
  var colDate1;
  rowm.eachCell(function(cell, colNumber) {
    if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
    {
      colDate1 = parseInt(colNumber);
      
      //var col = newworksheet.getColumn(colDate1);
      var man = newworksheet.getRow(3);
      var f = man.getCell(colDate1).value;
      var getko_ini = man.getCell(colDate1).address;
      if(getko_ini == iniValue.ko+3 && f == iniValue.ok)
      {
        colonnne = parseInt(colNumber);
      }
      }
  });
  console.log(" Colnumber"+colonnne);
 
  numeroLigne.getCell(colonnne).value = nombre_ok_ko.ok;
  await newWorkbook.xlsx.writeFile(path_reporting);
  sails.log("Ecriture OK KO terminé"); 
  return callback(null, "OK");

  }
  catch
  {
    console.log("Une erreur s'est produite");
    Reportinghtp.deleteToutHtp(table,3,callback);
  }
  },
/********************************************************************/
  getConfigIni : function() {
    const fs = require('fs');
    const ini = require('ini');
    const config = ini.parse(fs.readFileSync('./config_excel_contentieux.ini', 'utf-8'));
    console.log(config);
    return config;
  },

  getIniValue : function(table) {
    var iniValue = Contentieux.getConfigIni();
    var numeroColonneOk,numeroColonneKo;

    if(table == "contentieuxcbtp"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxcbtp.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxcbtp.ko;
    }
    if(table == "contentieuxretouralm1"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm1.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm1.ko;
    }
    if(table == "contentieuxretouralm2"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm2.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm2.ko;
    }
    if(table == "contentieuxretouralm3"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm3.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm3.ko;
    }
    if(table == "contentieuxretouralm4"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm4.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm4.ko;
    }
    if(table == "contentieuxretouralm5"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm5.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm5.ko;
    }
    if(table == "contentieuxretouralm6"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm6.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm6.ko;
    }
    if(table == "contentieuxretouralm7"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm7.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm7.ko;
    }
    if(table == "contentieuxretouralm8"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm8.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm8.ko;
    }
    if(table == "contentieuxretouralm9"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm9.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm9.ko;
    }
    if(table == "contentieuxretouralm10"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm10.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm10.ko;
    }
    if(table == "contentieuxretouralm11"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm11.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm11.ko;
    }   
    if(table == "contentieuxretouralm12"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretouralm12.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretouralm12.ko;
    } 
    if(table == "contentieuxretourcbtp1"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretourcbtp1.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretourcbtp1.ko;
    } 
    if(table == "contentieuxretourcbtp2"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretourcbtp2.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretourcbtp2.ko;
    } 
    if(table == "contentieuxretourcbtp3"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretourcbtp3.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretourcbtp3.ko;
    } 
    if(table == "contentieuxretourcbtp4"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretourcbtp4.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretourcbtp4.ko;
    } 
    if(table == "contentieuxretourcbtp5"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretourcbtp5.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretourcbtp5.ko;
    } 
    if(table == "contentieuxretourcbtp6"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretourcbtp6.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretourcbtp6.ko;
    } 
    if(table == "contentieuxretourcbtp7"){
      numeroColonneOk = iniValue.suivi_saisie_contentieuxretourcbtp7.ok;
      numeroColonneKo = iniValue.suivi_saisie_contentieuxretourcbtp7.ko;
    } 

    var ok_ko = {};
    ok_ko.ok = numeroColonneOk;
    ok_ko.ko = numeroColonneKo;

    console.log("INI OK = "+ok_ko.ok);
    console.log("INI KO = "+ok_ko.ko);
    return ok_ko;
  },

  

};

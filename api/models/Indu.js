/**
 * Indu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const path_reporting = 'D:/LDR8_1421_nouv/PROJET_FELANA/REPORTING INDU Type.xlsx';
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
        Indu.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Indu.query(sqlKo, function(err, resKo){
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
  countOkKoTrameLamie : function (table, callback) {
    const Excel = require('exceljs');
    var sqlOk ="select count(okko) as ok from "+table+" where okko='OK' AND typologiedelademande!='Résiliation' "; //trameFlux
    var sqlKo ="select count(okko) as ko from "+table+" where okko='KO'  AND typologiedelademande!='Résiliation' ";
    console.log(sqlOk);
    console.log(sqlKo);
    async.series([
      function (callback) {
        Indu.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Indu.query(sqlKo, function(err, resKo){
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
  countOkKoTrameLamieResiliation : function (table, callback) {
    const Excel = require('exceljs');
    var sqlOk ="select count(okko) as ok from "+table+" where okko='OK' AND typologiedelademande='Résiliation' "; //trameFlux
    var sqlKo ="select count(okko) as ko from "+table+" where okko='KO'  AND typologiedelademande='Résiliation' ";
    console.log(sqlOk);
    console.log(sqlKo);
    async.series([
      function (callback) {
        Indu.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Indu.query(sqlKo, function(err, resKo){
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
  getConfigIni : function() {
    const fs = require('fs');
    const ini = require('ini');
    const config = ini.parse(fs.readFileSync('./config_excel_indu.ini', 'utf-8'));
    console.log(config);
    return config;
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
      var dateExcel = Indu.convertDate(cell.text);
      if(dateExcel==date_export)
      {
        ligneDate1 = parseInt(rowNumber);
        var line = newworksheet.getRow(ligneDate1);
        var f = line.getCell(3).value;
        //console.log();
        if(f == "almerys")
        {
          ligneDate = parseInt(rowNumber);
        }
      }
    });
    console.log("LIGNE DATE ===> "+ ligneDate);
    var rowDate = newworksheet.getRow(ligneDate);
    var numeroLigne = rowDate;
    var iniValue = Indu.getIniValue(table);
    
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
        // console.log('comparaisonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        // console.log(getko_ini);
        // console.log(iniValue.ko+3);

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
/*************************************************************************/
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
    var dateExcel = Indu.convertDate(cell.text);
    if(dateExcel==date_export)
    {
      ligneDate1 = parseInt(rowNumber);
      var line = newworksheet.getRow(ligneDate1);
      var f = line.getCell(3).value;
      // console.log(f);
      if(f == "cbtp")
      {
        ligneDate = parseInt(rowNumber);
      }
    }
  });
  console.log("LIGNE DATE ===> "+ ligneDate);
  var rowDate = newworksheet.getRow(ligneDate);
  var numeroLigne = rowDate;
  var iniValue = Indu.getIniValue(table);
  
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
      // console.log('comparaisonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log(getko_ini);
      // console.log(iniValue.ko+3);

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

/*************************************************************************/
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
    var dateExcel = Indu.convertDate(cell.text);
    if(dateExcel==date_export)
    {
      ligneDate1 = parseInt(rowNumber);
      var line = newworksheet.getRow(ligneDate1);
      var f = line.getCell(3).value;
      //console.log();
      if(f == "almerys")
      {
        ligneDate = parseInt(rowNumber);
      }
    }
  });
  console.log("LIGNE DATE ===> "+ ligneDate);
  var rowDate = newworksheet.getRow(ligneDate);
  var numeroLigne = rowDate;
  var iniValue = Indu.getIniValue(table);
  
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
      // console.log('comparaisonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log(getko_ini);
      // console.log(iniValue.ko+3);

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

/*************************************************************************/
ecritureOkKo4 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
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
    var dateExcel = Indu.convertDate(cell.text);
    if(dateExcel==date_export)
    {
      ligneDate1 = parseInt(rowNumber);
      var line = newworksheet.getRow(ligneDate1);
      var f = line.getCell(3).value;
      //console.log();
      if(f == "Santéclair")
      {
        ligneDate = parseInt(rowNumber);
      }
    }
  });
  console.log("LIGNE DATE ===> "+ ligneDate);
  var rowDate = newworksheet.getRow(ligneDate);
  var numeroLigne = rowDate;
  var iniValue = Indu.getIniValue(table);
  
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
      // console.log('comparaisonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log(getko_ini);
      // console.log(f);

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

/*************************************************************************/
ecritureOkKo5 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
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
    var dateExcel = Indu.convertDate(cell.text);
    if(dateExcel==date_export)
    {
      ligneDate1 = parseInt(rowNumber);
      var line = newworksheet.getRow(ligneDate1);
      var f = line.getCell(3).value;
      //console.log();
      if(f == "cbtp")
      {
        ligneDate = parseInt(rowNumber);
      }
    }
  });
  console.log("LIGNE DATE ===> "+ ligneDate);
  var rowDate = newworksheet.getRow(ligneDate);
  var numeroLigne = rowDate;
  var iniValue = Indu.getIniValue(table);
  
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
      // console.log('comparaisonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log(getko_ini);
      // console.log(f);

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


/*************************************************************************/
  getIniValue : function(table) {
    var iniValue = Indu.getConfigIni();
    var numeroColonneOk,numeroColonneKo;

    if(table == "indualm"){
      numeroColonneOk = iniValue.suivi_saisie_indualm.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm.ko;
    }
    if(table == "indualm1"){
      numeroColonneOk = iniValue.suivi_saisie_indualm1.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm1.ko;
    }
    if(table == "indualm2"){
      numeroColonneOk = iniValue.suivi_saisie_indualm2.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm2.ko;
    }
    if(table == "indualm3"){
      numeroColonneOk = iniValue.suivi_saisie_indualm3.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm3.ko;
    }
    if(table == "indualm4"){
      numeroColonneOk = iniValue.suivi_saisie_indualm4.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm4.ko;
    }
    if(table == "indualm5"){
      numeroColonneOk = iniValue.suivi_saisie_indualm5.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm5.ko;
    }
    if(table == "indualm6"){
      numeroColonneOk = iniValue.suivi_saisie_indualm6.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm6.ko;
    }
    if(table == "indualm7"){
      numeroColonneOk = iniValue.suivi_saisie_indualm7.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm7.ko;
    }
    if(table == "indualm8"){
      numeroColonneOk = iniValue.suivi_saisie_indualm8.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm8.ko;
    }
    if(table == "indualm9"){
      numeroColonneOk = iniValue.suivi_saisie_indualm9.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm9.ko;
    }
    if(table == "indualm10"){
      numeroColonneOk = iniValue.suivi_saisie_indualm10.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm10.ko;
    }
    if(table == "indualm11"){
      numeroColonneOk = iniValue.suivi_saisie_indualm11.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm11.ko;
    }
    if(table == "indualm12"){
      numeroColonneOk = iniValue.suivi_saisie_indualm12.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm12.ko;
    }
    if(table == "indualm13"){
      numeroColonneOk = iniValue.suivi_saisie_indualm13.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm13.ko;
    }
    if(table == "indualm14"){
      numeroColonneOk = iniValue.suivi_saisie_indualm14.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm14.ko;
    }
    if(table == "indualm15"){
      numeroColonneOk = iniValue.suivi_saisie_indualm15.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm15.ko;
    }
    if(table == "indualm16"){
      numeroColonneOk = iniValue.suivi_saisie_indualm16.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm16.ko;
    }
    if(table == "indualm17"){
      numeroColonneOk = iniValue.suivi_saisie_indualm17.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm17.ko;
    }
    if(table == "indualm18"){
      numeroColonneOk = iniValue.suivi_saisie_indualm18.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm18.ko;
    }
    if(table == "indualm19"){
      numeroColonneOk = iniValue.suivi_saisie_indualm19.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm19.ko;
    }
    if(table == "indualm20"){
      numeroColonneOk = iniValue.suivi_saisie_indualm20.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm20.ko;
    }
    if(table == "indualm21"){
      numeroColonneOk = iniValue.suivi_saisie_indualm21.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm21.ko;
    }
    if(table == "indualm22"){
      numeroColonneOk = iniValue.suivi_saisie_indualm22.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm22.ko;
    }
    if(table == "indualm23"){
      numeroColonneOk = iniValue.suivi_saisie_indualm23.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm23.ko;
    }
    if(table == "indualm24"){
      numeroColonneOk = iniValue.suivi_saisie_indualm24.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm24.ko;
    }
    if(table == "indualm25"){
      numeroColonneOk = iniValue.suivi_saisie_indualm25.ok;
      numeroColonneKo = iniValue.suivi_saisie_indualm25.ko;
    }
    if(table == "inducbtp1"){
      numeroColonneOk = iniValue.suivi_saisie_inducbtp1.ok;
      numeroColonneKo = iniValue.suivi_saisie_inducbtp1.ko;
    }
    if(table == "inducbtp2"){
      numeroColonneOk = iniValue.suivi_saisie_inducbtp2.ok;
      numeroColonneKo = iniValue.suivi_saisie_inducbtp2.ko;
    }
    if(table == "inducbtp3"){
      numeroColonneOk = iniValue.suivi_saisie_inducbtp3.ok;
      numeroColonneKo = iniValue.suivi_saisie_inducbtp3.ko;
    }
    if(table == "inducbtp4"){
      numeroColonneOk = iniValue.suivi_saisie_inducbtp4.ok;
      numeroColonneKo = iniValue.suivi_saisie_inducbtp4.ko;
    }
    if(table == "induretouralm1"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm1.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm1.ko;
    }
    if(table == "induretouralm2"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm2.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm2.ko;
    }
    if(table == "induretouralm3"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm3.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm3.ko;
    }
    if(table == "induretouralm4"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm4.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm4.ko;
    }
    if(table == "induretouralm5"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm5.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm5.ko;
    }
    if(table == "induretouralm6"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm6.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm6.ko;
    }
    if(table == "induretouralm7"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm7.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm7.ko;
    }
    if(table == "induretouralm8"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm8.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm8.ko;
    }
    if(table == "induretouralm9"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm9.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm9.ko;
    }
    if(table == "induretouralm10"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm10.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm10.ko;
    }
    if(table == "induretouralm11"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm11.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm11.ko;
    }
    if(table == "induretouralm12"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm12.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm12.ko;
    }
    if(table == "induretouralm13"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm13.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm13.ko;
    }
    if(table == "induretouralm14"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm14.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm14.ko;
    }
    if(table == "induretouralm15"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm15.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm15.ko;
    }
    if(table == "induretouralm16"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm16.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm16.ko;
    }
    if(table == "induretouralm17"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm17.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm17.ko;
    }
    if(table == "induretouralm18"){
      numeroColonneOk = iniValue.suivi_saisie_induretouralm18.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretouralm18.ko;
    }
    if(table == "induretoursante1"){
      numeroColonneOk = iniValue.suivi_saisie_induretoursante1.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretoursante1.ko;
    }
    if(table == "induretoursante2"){
      numeroColonneOk = iniValue.suivi_saisie_induretoursante2.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretoursante2.ko;
    }
    if(table == "induretourcbtp1"){
      numeroColonneOk = iniValue.suivi_saisie_induretourcbtp1.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretourcbtp1.ko;
    }
    if(table == "induretourcbtp2"){
      numeroColonneOk = iniValue.suivi_saisie_induretourcbtp2.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretourcbtp2.ko;
    }
    if(table == "induretourcbtp3"){
      numeroColonneOk = iniValue.suivi_saisie_induretourcbtp3.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretourcbtp3.ko;
    }
    if(table == "induretourcbtp4"){
      numeroColonneOk = iniValue.suivi_saisie_induretourcbtp4.ok;
      numeroColonneKo = iniValue.suivi_saisie_induretourcbtp4.ko;
    }

    var ok_ko = {};
    ok_ko.ok = numeroColonneOk;
    ok_ko.ko = numeroColonneKo;

    console.log("INI OK = "+ok_ko.ok);
    console.log("INI KO = "+ok_ko.ko);
    return ok_ko;
  },

  

};



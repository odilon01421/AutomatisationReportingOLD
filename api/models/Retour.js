/**
 * Retour.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const path_reporting = 'D:/LDR8_1421_nouv/PROJET_FELANA/REPORTING RETOUR Type.xlsx';
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
        Retour.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Retour.query(sqlKo, function(err, resKo){
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
  countOkKoTrameLamie2 : function (table, callback) {
    const Excel = require('exceljs');
    var sqlOk ="select count(okko) as ok from "+table+" where okko='OK' "; //trameFlux
    var sqlKo ="select count(okko) as ko from "+table+" where okko='KO' ";
    console.log(sqlOk);
    console.log(sqlKo);
    async.series([
      function (callback) {
        Retour.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Retour.query(sqlKo, function(err, resKo){
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
        Retour.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Retour.query(sqlKo, function(err, resKo){
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
        Retour.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Retour.query(sqlKo, function(err, resKo){
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
  countOkKoTrameLamie2 : function (table, callback) {
    const Excel = require('exceljs');
    var sqlOk ="select count(okko) as ok from "+table+" where okko='OK' AND typologiedelademande='Résiliation' "; //trameFlux
    var sqlKo ="select count(okko) as ko from "+table+" where okko='KO'  AND typologiedelademande='Résiliation' ";
    console.log(sqlOk);
    console.log(sqlKo);
    async.series([
      function (callback) {
        Retour.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Retour.query(sqlKo, function(err, resKo){
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
      var dateExcel = Retour.convertDate(cell.text);
      if(dateExcel==date_export)
      {
        ligneDate1 = parseInt(rowNumber);
        var line = newworksheet.getRow(ligneDate1);
        var f = line.getCell(3).value;
        // console.log(f);
        if(f == "Publispostage")
        {
          ligneDate = parseInt(rowNumber);
        }
      }
    });
    console.log("LIGNE DATE ===> "+ ligneDate);
    var rowDate = newworksheet.getRow(ligneDate);
    var numeroLigne = rowDate;
    var iniValue = Retour.getIniValue(table);
    
    var a5;

    var rowm = newworksheet.getRow(1);
   

    var collonne;
    var colDate2;
    rowm.eachCell(function(cell, colNumber) {
      if(cell.value == 'DOCUMENTS SAISIS')
      {
        colDate2 = parseInt(colNumber);
        var man = newworksheet.getRow(3);
        var f = man.getCell(colDate2).value;
        if(f == iniValue.ok)
        {
          collonne = parseInt(colNumber);
        }
      }
    });
    console.log(" Colnumber2"+collonne);
    numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
    
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
    /****************************************************************/
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
        var dateExcel = Retour.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          //console.log();
          if(f == "retour santeclair")
          {
            ligneDate = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      var rowDate = newworksheet.getRow(ligneDate);
      var numeroLigne = rowDate;
      var iniValue = Retour.getIniValue(table);
      
      var a5;
  
      var rowm = newworksheet.getRow(1);
       
      var collonne;
      var colDate2;
      rowm.eachCell(function(cell, colNumber) {
        if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
        {
          colDate2 = parseInt(colNumber);
          var man = newworksheet.getRow(3);
          var f = man.getCell(colDate2).value;
          if(f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
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
    /***************************************************************/
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
        var dateExcel = Retour.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
          if(f == "retour almerys GTO")
          {
            ligneDate = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      var rowDate = newworksheet.getRow(ligneDate);
      var numeroLigne = rowDate;
      var iniValue = Retour.getIniValue(table);
      
      var a5;
  
      var rowm = newworksheet.getRow(1);
        
      var collonne;
      var colDate2;
      rowm.eachCell(function(cell, colNumber) {
        if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
        {
          colDate2 = parseInt(colNumber);
          var man = newworksheet.getRow(3);
          var f = man.getCell(colDate2).value;
          
          if(f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
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
    /***************************************************************/
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
        var dateExcel = Retour.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          //console.log();
          if(f == "retour Almerys FTP")
          {
            ligneDate = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      var rowDate = newworksheet.getRow(ligneDate);
      var numeroLigne = rowDate;
      var iniValue = Retour.getIniValue(table);
      
      var a5;
  
      var rowm = newworksheet.getRow(1);
        
      var collonne;
      var colDate2;
      rowm.eachCell(function(cell, colNumber) {
        if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
        {
          colDate2 = parseInt(colNumber);
          var man = newworksheet.getRow(3);
          var f = man.getCell(colDate2).value;
          if(f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
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
    /***************************************************************/
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
        var dateExcel = Retour.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          //console.log();
          if(f == "retour Almerys pack spé")
          {
            ligneDate = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      var rowDate = newworksheet.getRow(ligneDate);
      var numeroLigne = rowDate;
      var iniValue = Retour.getIniValue(table);
      
      var a5;
  
      var rowm = newworksheet.getRow(1);
        
      var collonne;
      var colDate2;
      rowm.eachCell(function(cell, colNumber) {
        if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
        {
          colDate2 = parseInt(colNumber);
          var man = newworksheet.getRow(3);
          var f = man.getCell(colDate2).value;
          if(f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
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
    /***************************************************************/
    ecritureOkKo6 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
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
        var dateExcel = Retour.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          //console.log();
          if(f == "retour almerys Cbtp GTO")
          {
            ligneDate = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      var rowDate = newworksheet.getRow(ligneDate);
      var numeroLigne = rowDate;
      var iniValue = Retour.getIniValue(table);
      
      var a5;
  
      var rowm = newworksheet.getRow(1);
        
      var collonne;
      var colDate2;
      rowm.eachCell(function(cell, colNumber) {
        if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
        {
          colDate2 = parseInt(colNumber);
          var man = newworksheet.getRow(3);
          var f = man.getCell(colDate2).value;
          if(f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
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
    /***************************************************************/
   ecritureOkKo7 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
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
        var dateExcel = Retour.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          //console.log();
          if(f == "etat des restes")
          {
            ligneDate = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      var rowDate = newworksheet.getRow(ligneDate);
      var numeroLigne = rowDate;
      var iniValue = Retour.getIniValue(table);
      
      var a5;
  
      var rowm = newworksheet.getRow(1);
        
      var collonne;
      var colDate2;
      rowm.eachCell(function(cell, colNumber) {
        if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
        {
          colDate2 = parseInt(colNumber);
          var man = newworksheet.getRow(3);
          var f = man.getCell(colDate2).value;
          if(f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
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
    /***************************************************************/
    ecritureOkKo8 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
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
        var dateExcel = Retour.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          //console.log();
          if(f == "Publispostage")
          {
            ligneDate = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      var rowDate = newworksheet.getRow(ligneDate);
      var numeroLigne = rowDate;
      var iniValue = Retour.getIniValue(table);
      
      var a5;
  
      var rowm = newworksheet.getRow(1);
        
      var collonne;
      var colDate2;
      rowm.eachCell(function(cell, colNumber) {
        if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
        {
          colDate2 = parseInt(colNumber);
          var man = newworksheet.getRow(3);
          var f = man.getCell(colDate2).value;
          if(f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
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
    /***************************************************************/

  getConfigIni : function() {
    const fs = require('fs');
    const ini = require('ini');
    const config = ini.parse(fs.readFileSync('./config_excel_retour.ini', 'utf-8'));
    console.log(config);
    return config;
  },

  getIniValue : function(table) {
    var iniValue = Retour.getConfigIni();
    var numeroColonneOk,numeroColonneKo;

    if(table == "retourpubli"){
      numeroColonneOk = iniValue.suivi_saisie_retourpubli.ok;
      numeroColonneKo = iniValue.suivi_saisie_retourpubli.ko;
    }
    if(table == "retoursante1"){
      numeroColonneOk = iniValue.suivi_saisie_retoursante1.ok;
      numeroColonneKo = iniValue.suivi_saisie_retoursante1.ko;
    }
    if(table == "retoursante2"){
      numeroColonneOk = iniValue.suivi_saisie_retoursante2.ok;
      numeroColonneKo = iniValue.suivi_saisie_retoursante2.ko;
    }
    if(table == "retoursante3"){
      numeroColonneOk = iniValue.suivi_saisie_retoursante3.ok;
      numeroColonneKo = iniValue.suivi_saisie_retoursante3.ko;
    }
    if(table == "retouralmgto1"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto1.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto1.ko;
    }
    if(table == "retouralmgto2"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto2.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto2.ko;
    }
    if(table == "retouralmgto3"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto3.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto3.ko;
    }
    if(table == "retouralmgto4"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto4.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto4.ko;
    }
    if(table == "retouralmgto5"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto5.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto5.ko;
    }
    if(table == "retouralmgto6"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto6.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto6.ko;
    }
    if(table == "retouralmgto7"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto7.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto7.ko;
    }
    if(table == "retouralmgto8"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto8.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto8.ko;
    }
    if(table == "retouralmgto9"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto9.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto9.ko;
    }
    if(table == "retouralmgto10"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto10.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto10.ko;
    }
    if(table == "retouralmgto11"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmgto11.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmgto11.ko;
    }
    if(table == "retouralmftp1"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmftp1.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmftp1.ko;
    }
    if(table == "retouralmftp2"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmftp2.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmftp2.ko;
    }
    if(table == "retouralmftp3"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmftp3.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmftp3.ko;
    }
    if(table == "retouralmftp4"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmftp4.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmftp4.ko;
    }
    if(table == "retouralmpackspe1"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmpackspe1.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmpackspe1.ko;
    }
    if(table == "retouralmpackspe2"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmpackspe2.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmpackspe2.ko;
    }
    if(table == "retouralmpackspe3"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmpackspe3.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmpackspe3.ko;
    }
    if(table == "retouralmpackspe4"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmpackspe4.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmpackspe4.ko;
    }
    if(table == "retouralmcbtpgto"){
      numeroColonneOk = iniValue.suivi_saisie_retouralmcbtpGTO.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouralmcbtpGTO.ko;
    }
    if(table == "retouretat1"){
      numeroColonneOk = iniValue.suivi_saisie_retouretat1.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouretat1.ko;
    }
    if(table == "retouretat2"){
      numeroColonneOk = iniValue.suivi_saisie_retouretat2.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouretat2.ko;
    }
    if(table == "retouretat3"){
      numeroColonneOk = iniValue.suivi_saisie_retouretat3.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouretat3.ko;
    }
    if(table == "retouretat4"){
      numeroColonneOk = iniValue.suivi_saisie_retouretat4.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouretat4.ko;
    }
    if(table == "retouretat5"){
      numeroColonneOk = iniValue.suivi_saisie_retouretat5.ok;
      numeroColonneKo = iniValue.suivi_saisie_retouretat5.ko;
    }
    if(table == "retourpublipostage1"){
      numeroColonneOk = iniValue.suivi_saisie_retourpublipostage1.ok;
      numeroColonneKo = iniValue.suivi_saisie_retourpublipostage1.ko;
    }
    if(table == "retourpublipostage2"){
      numeroColonneOk = iniValue.suivi_saisie_retourpublipostage2.ok;
      numeroColonneKo = iniValue.suivi_saisie_retourpublipostage2.ko;
    }
    if(table == "retourpublipostage3"){
      numeroColonneOk = iniValue.suivi_saisie_retourpublipostage3.ok;
      numeroColonneKo = iniValue.suivi_saisie_retourpublipostage3.ko;
    }
    if(table == "retourpublipostage4"){
      numeroColonneOk = iniValue.suivi_saisie_retourpublipostage4.ok;
      numeroColonneKo = iniValue.suivi_saisie_retourpublipostage4.ko;
    }
    if(table == "retourpublipostage5"){
      numeroColonneOk = iniValue.suivi_saisie_retourpublipostage5.ok;
      numeroColonneKo = iniValue.suivi_saisie_retourpublipostage5.ko;
    }
    if(table == "retourpublipostage6"){
      numeroColonneOk = iniValue.suivi_saisie_retourpublipostage6.ok;
      numeroColonneKo = iniValue.suivi_saisie_retourpublipostage6.ko;
    }
   
    var ok_ko = {};
    ok_ko.ok = numeroColonneOk;
    ok_ko.ko = numeroColonneKo;

    console.log("INI OK = "+ok_ko.ok);
    console.log("INI KO = "+ok_ko.ko);
    return ok_ko;
  },



};


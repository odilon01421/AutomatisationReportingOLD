/**
 * Inovcom.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const path_reporting = 'D:/LDR8_1421_nouv/PROJET_FELANA/REPORTING INOVCOM Type.xlsx';
// const path_reporting = 'D:/LDR8_1421_nouv/PROJET_FELANA/REPORTING HTP Type.xlsx';

module.exports = {
  attributes: {
  },
  countOkKo : function(table, callback){
      const Excel = require('exceljs');
      // const table = "trameflux";
      var sqlOk = "select count(okko) as ok from "+table+" where okko='OK'";
      var sqlKo = "select count(okko) as ko from "+table+" where okko='KO'";
      async.series([
        function (callback){
          Inovcom.query(sqlOk, function(err, res){
            if(err) return res.badRequest(err);
            callback(null, res.rows[0].ok);
          });
        },
        function (callback){
          Inovcom.query(sqlKo, function(err, resKo){
            if(err) return resKo.badRequest(err);
            callback(null, resKo.rows[0].ko);
          });
        },
      ],
      function(err, result){
        if(err) return result.badRequest(err);
        console.log("Count OK ==> " + result[0]);
        console.log("Count KO ==> " + result[1]);
        var okko = {};
        okko.ok = result[0];
        okko.ko = result[1];
        callback(null, okko);
      });
    },
   
  countOkKoTrameLamie : function (table, callback) {
    const Excel = require('exceljs');
    var sqlOk ="select count(okko) as ok from "+table+" where okko='OK' AND typologiedelademande!='Résiliation' "; //trameFlux
    var sqlKo ="select count(okko) as ko from "+table+" where okko='KO'  AND typologiedelademande!='Résiliation' ";
    console.log(sqlOk);
    console.log(sqlKo);
    async.series([
      function (callback) {
        Inovcom.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Inovcom.query(sqlKo, function(err, resKo){
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
        Inovcom.query(sqlOk, function(err, res){
          if (err) return res.badRequest(err);
          callback(null, res.rows[0].ok);
        });
      },
      function (callback) {
        Inovcom.query(sqlKo, function(err, resKo){
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
    const config = ini.parse(fs.readFileSync('./config_excel_58.ini', 'utf-8'));
    // console.log('****************************')
    // console.log(config);
    // console.log('****************************')
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
      var dateExcel = Inovcom.convertDate(cell.text);
      if(dateExcel==date_export)
      {
        ligneDate1 = parseInt(rowNumber);
        var line = newworksheet.getRow(ligneDate1);
        var f = line.getCell(3).value;
        // console.log(f);
        if(f == "ALMERYS")
        {
          ligneDate = parseInt(rowNumber);
        }
      }
    });
    console.log("LIGNE DATE ===> "+ ligneDate);
    var rowDate = newworksheet.getRow(ligneDate);
    var numeroLigne = rowDate;
    var iniValue = Inovcom.getIniValue(table);
    
    var a5;

    var rowm = newworksheet.getRow(1);
    var colonnne;
    var colDate1;
    rowm.eachCell(function(cell, colNumber) {
      if(cell.value == 'DOCUMENTS SAISIS')
      {
        colDate1 = parseInt(colNumber);
        console.log('COLDATE1 ====>'+colDate1);
        //var col = newworksheet.getColumn(colDate1);
        var man = newworksheet.getRow(3);
        var f = man.getCell(colDate1).value;
        //console.log();
        //console.log(iniValue.ok);
        if(f == iniValue.ok)
        {
          colonnne = parseInt(colNumber);
        }
        }
    });
    console.log(" Colnumber"+colonnne);
    // var collonne;
    // var colDate2;
    // rowm.eachCell(function(cell, colNumber) {
    //   if(cell.value == 'DOCUMENTS TRAITES NON SAISIS (RETOURS)')
    //   {
    //     colDate2 = parseInt(colNumber);
    //     var man = newworksheet.getRow(3);
    //     var f = man.getCell(colDate2).value;
    //     if(f == iniValue.ok)
    //     {
    //       collonne = parseInt(colNumber);
    //     }
    //   }
    // });
    // console.log(" Colnumber2"+collonne);

    numeroLigne.getCell(colonnne).value = nombre_ok_ko.ok;
    // numeroLigne.getCell(collonne).value = nombre_ok_ko.oK;
    await newWorkbook.xlsx.writeFile(path_reporting);
    sails.log("Ecriture OK KO terminé avec succes"); 
    return callback(null, "OK");
  
    }
    catch
    {
      console.log("Une erreur s'est produite test test test");
      Reportinghtp.deleteToutHtp(table,3,callback);
    }
    },
    /*********************************************************/
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
      // var ligneDatePack;
      // var ligneDateSante;
      // var ligneDateMgefi;
      // var ligneDateMgefiPack;
      // var ligneDatePubli;
      colonneDate.eachCell(function(cell, rowNumber) {
        var dateExcel = Inovcom.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
          if(f == "ALMERYS")
          {
            ligneDate = parseInt(rowNumber);
          }
          // if(f == "Pack Spé .ALMERYS")
          // {
          //   ligneDatePack = parseInt(rowNumber);
          // }
          // if(f == "SANTECLAIR")
          // {
          //   ligneDateSante = parseInt(rowNumber);
          // }
          // if(f == "MGEFI")
          // {
          //   ligneDateMgefi = parseInt(rowNumber);
          // }
          // if(f == "MGEFI PACK SPE")
          // {
          //   ligneDateMgefiPack = parseInt(rowNumber);
          // }
          // if(f == "PUBLIPOSTAGE")
          // {
          //   ligneDatePubli = parseInt(rowNumber);
          // }
        }
      });
      console.log("LIGNE DATE ===> "+ ligneDate);
      // console.log("LIGNE DATE Pack ===> "+ ligneDatePack);
      // console.log("LIGNE DATE Sante ===> "+ ligneDateSante);
      // console.log("LIGNE DATE Mgefi ===> "+ ligneDateMgefi);
      // console.log("LIGNE DATE MgefiPack ===> "+ ligneDateMgefiPack);
      // console.log("LIGNE DATE Publi ===> "+ ligneDatePubli);
      var rowDate = newworksheet.getRow(ligneDate);
      // var rowDatePack = newworksheet.getRow(ligneDatePack);
      // var rowDateSante = newworksheet.getRow(ligneDateSante);
      // var rowDateMgefi = newworksheet.getRow(ligneDateMgefi);
      // var rowDateMgefiPack = newworksheet.getRow(ligneDateMgefiPack);
      // var rowDatePubli = newworksheet.getRow(ligneDatePubli);
      var numeroLigne = rowDate;
      // var numeroLignePack = rowDatePack;
      // var numeroLigneSante = rowDateSante;
      // var numeroLigneMgefi = rowDateMgefi;
      // var numeroLigneMgefiPack = rowDateMgefiPack;
      // var numeroLignePubli = rowDatePubli;
      var iniValue = Inovcom.getIniValue(table);
      
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
          var getko_ini = man.getCell(colDate2).address;

          if(getko_ini == iniValue.ko+3 && f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
  
      // numeroLigne.getCell(colonnne).value = nombre_ok_ko.ok;
      numeroLigne.getCell(collonne).value = nombre_ok_ko.ok;
      // numeroLignePack.getCell(collonne).value = nombre_ok_ko.ok;
      // numeroLigneSante.getCell(collonne).value = nombre_ok_ko.ok;
      // numeroLigneMgefi.getCell(collonne).value = nombre_ok_ko.ok;
      // numeroLigneMgefiPack.getCell(collonne).value = nombre_ok_ko.ok;
      // numeroLignePubli.getCell(collonne).value = nombre_ok_ko.ok;
      await newWorkbook.xlsx.writeFile(path_reporting);
      sails.log("Ecriture OK KO terminé avec succes"); 
      return callback(null, "OK");
    
      }
      catch
      {
        console.log("Une erreur s'est produite test test test");
        Reportinghtp.deleteToutHtp(table,3,callback);
      }
      },
    /*****************************************/
    ecritureOkKo3 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
      const Excel = require('exceljs');
      const cmd=require('node-cmd');
      const newWorkbook = new Excel.Workbook();

      try{
              
        await newWorkbook.xlsx.readFile(path_reporting);
      const newworksheet = newWorkbook.getWorksheet(mois1);
      var colonneDate = newworksheet.getColumn('A');
      var ligneDate1;
      var ligneDatePack;
      colonneDate.eachCell(function(cell, rowNumber) {
        var dateExcel = Inovcom.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
          
          if(f == "Pack Spé .ALMERYS")
          {
            ligneDatePack = parseInt(rowNumber);
          }
          
        }
      });
      console.log("LIGNE DATE Pack ===> "+ ligneDatePack);
      
      var rowDatePack = newworksheet.getRow(ligneDatePack);    
      var numeroLignePack = rowDatePack;
      var iniValue = Inovcom.getIniValue(table);
      
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
          var getko_ini = man.getCell(colDate2).address;

          if(getko_ini == iniValue.ko+3 && f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
  
      numeroLignePack.getCell(collonne).value = nombre_ok_ko.ok;
      await newWorkbook.xlsx.writeFile(path_reporting);
      sails.log("Ecriture OK KO terminé avec succes"); 
      return callback(null, "OK");
    
      }
      catch
      {
        console.log("Une erreur s'est produite test test test");
        Reportinghtp.deleteToutHtp(table,3,callback);
      }
      },
    
    /*******************************************************/
    ecritureOkKo4 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
      const Excel = require('exceljs');
      const cmd=require('node-cmd');
      const newWorkbook = new Excel.Workbook();

      try{
              
        await newWorkbook.xlsx.readFile(path_reporting);
      const newworksheet = newWorkbook.getWorksheet(mois1);
      var colonneDate = newworksheet.getColumn('A');
      var ligneDate1;
      var ligneDateSante;
      colonneDate.eachCell(function(cell, rowNumber) {
        var dateExcel = Inovcom.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
          
          if(f == "SANTECLAIR")
          {
            ligneDateSante = parseInt(rowNumber);
          }
          
        }
      });
      console.log("LIGNE DATE Sante ===> "+ ligneDateSante);
      
      var rowDateSante = newworksheet.getRow(ligneDateSante);    
      var numeroLigneSante = rowDateSante;
      var iniValue = Inovcom.getIniValue(table);
      
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
          var getko_ini = man.getCell(colDate2).address;

          if(f == iniValue.ok && getko_ini == iniValue.ko+3)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigneSante.getCell(collonne).value = nombre_ok_ko.ok;
      await newWorkbook.xlsx.writeFile(path_reporting);
      sails.log("Ecriture OK KO terminé avec succes"); 
      return callback(null, "OK");
    
      }
      catch
      {
        console.log("Une erreur s'est produite test test test");
        Reportinghtp.deleteToutHtp(table,3,callback);
      }
      },
    /*******************************************************/
    ecritureOkKo5 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
      const Excel = require('exceljs');
      const cmd=require('node-cmd');
      const newWorkbook = new Excel.Workbook();

      try{
              
        await newWorkbook.xlsx.readFile(path_reporting);
      const newworksheet = newWorkbook.getWorksheet(mois1);
      var colonneDate = newworksheet.getColumn('A');
      var ligneDate1;
      var ligneDatePackspe;
      colonneDate.eachCell(function(cell, rowNumber) {
        var dateExcel = Inovcom.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
          
          if(f == "Pack Spé. CBTP")
          {
            ligneDatePackspe = parseInt(rowNumber);
          }
          
        }
      });
      console.log("LIGNE DATE Packspe ===> "+ ligneDatePackspe);
      
      var rowDatePackspe = newworksheet.getRow(ligneDatePackspe);    
      var numeroLignePackspe = rowDatePackspe;
      var iniValue = Inovcom.getIniValue(table);
      
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
          var getko_ini = man.getCell(colDate2).address;

          if(getko_ini == iniValue.ko+3 || f == iniValue.ok)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLignePackspe.getCell(collonne).value = nombre_ok_ko.ok;
      await newWorkbook.xlsx.writeFile(path_reporting);
      sails.log("Ecriture OK KO terminé avec succes"); 
      return callback(null, "OK");
    
      }
      catch
      {
        console.log("Une erreur s'est produite test test test");
        Reportinghtp.deleteToutHtp(table,3,callback);
      }
      },
    /******************************************************/
    ecritureOkKo6 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
      const Excel = require('exceljs');
      const cmd=require('node-cmd');
      const newWorkbook = new Excel.Workbook();

      try{
              
        await newWorkbook.xlsx.readFile(path_reporting);
      const newworksheet = newWorkbook.getWorksheet(mois1);
      var colonneDate = newworksheet.getColumn('A');
      var ligneDate1;     
      var ligneDateMgefi;
      colonneDate.eachCell(function(cell, rowNumber) {
        var dateExcel = Inovcom.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
         
          if(f == "MGEFI")
          {
            ligneDateMgefi = parseInt(rowNumber);
          }
          
        }
      });
      
      console.log("LIGNE DATE Mgefi ===> "+ ligneDateMgefi);
      var rowDateMgefi = newworksheet.getRow(ligneDateMgefi);
      var numeroLigneMgefi = rowDateMgefi;
      var iniValue = Inovcom.getIniValue(table);
      
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
          var getko_ini = man.getCell(colDate2).address;

          if(f == iniValue.ok && getko_ini == iniValue.ko+3)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
      numeroLigneMgefi.getCell(collonne).value = nombre_ok_ko.ok;
      await newWorkbook.xlsx.writeFile(path_reporting);
      sails.log("Ecriture OK KO terminé avec succes"); 
      return callback(null, "OK");
    
      }
      catch
      {
        console.log("Une erreur s'est produite test test test");
        Reportinghtp.deleteToutHtp(table,3,callback);
      }
      },
    /******************************************************/
    ecritureOkKo7 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
      const Excel = require('exceljs');
      const cmd=require('node-cmd');
      const newWorkbook = new Excel.Workbook();

      try{
              
        await newWorkbook.xlsx.readFile(path_reporting);
      const newworksheet = newWorkbook.getWorksheet(mois1);
      var colonneDate = newworksheet.getColumn('A');
      var ligneDate1;
      var ligneDateMgefiPack;
      colonneDate.eachCell(function(cell, rowNumber) {
        var dateExcel = Inovcom.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
          if(f == "MGEFI PACK SPE")
          {
            ligneDateMgefiPack = parseInt(rowNumber);
          }
         
        }
      });
      
      console.log("LIGNE DATE MgefiPack ===> "+ ligneDateMgefiPack);
      var rowDateMgefiPack = newworksheet.getRow(ligneDateMgefiPack);
      var numeroLigneMgefiPack = rowDateMgefiPack;
      var iniValue = Inovcom.getIniValue(table);
      
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
          var getko_ini = man.getCell(colDate2).address;

          if(f == iniValue.ok && getko_ini == iniValue.ko+3)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);

      numeroLigneMgefiPack.getCell(collonne).value = nombre_ok_ko.ok;
      await newWorkbook.xlsx.writeFile(path_reporting);
      sails.log("Ecriture OK KO terminé avec succes"); 
      return callback(null, "OK");
    
      }
      catch
      {
        console.log("Une erreur s'est produite test test test");
        Reportinghtp.deleteToutHtp(table,3,callback);
      }
      },
    /******************************************************/
   ecritureOkKo8 : async function (nombre_ok_ko, table,date_export,mois1,callback) {
      const Excel = require('exceljs');
      const cmd=require('node-cmd');
      const newWorkbook = new Excel.Workbook();

      try{
              
        await newWorkbook.xlsx.readFile(path_reporting);
      const newworksheet = newWorkbook.getWorksheet(mois1);
      var colonneDate = newworksheet.getColumn('A');
      var ligneDate1;
      var ligneDatePubli;
      colonneDate.eachCell(function(cell, rowNumber) {
        var dateExcel = Inovcom.convertDate(cell.text);
        if(dateExcel==date_export)
        {
          ligneDate1 = parseInt(rowNumber);
          var line = newworksheet.getRow(ligneDate1);
          var f = line.getCell(3).value;
          // console.log(f);
          if(f == "PUBLIPOSTAGE")
          {
            ligneDatePubli = parseInt(rowNumber);
          }
        }
      });
      console.log("LIGNE DATE Publi ===> "+ ligneDatePubli);
      var rowDatePubli = newworksheet.getRow(ligneDatePubli);
      var numeroLignePubli = rowDatePubli;
      var iniValue = Inovcom.getIniValue(table);
      
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
          var getko_ini = man.getCell(colDate2).address;

          if(f == iniValue.ok && getko_ini == iniValue.ko+3)
          {
            collonne = parseInt(colNumber);
          }
        }
      });
      console.log(" Colnumber2"+collonne);
  
      numeroLignePubli.getCell(collonne).value = nombre_ok_ko.ok;
      await newWorkbook.xlsx.writeFile(path_reporting);
      sails.log("Ecriture OK KO terminé avec succes"); 
      return callback(null, "OK");
    
      }
      catch
      {
        console.log("Une erreur s'est produite test test test");
        Reportinghtp.deleteToutHtp(table,3,callback);
      }
      },
      /******************************************************/
  getIniValue : function(table) {
    var iniValue = Inovcom.getConfigIni();
    var numeroColonneOk,numeroColonneKo;

    if(table == "trameflux"){
      numeroColonneOk = iniValue.trame_flux.ok;
      numeroColonneKo = iniValue.trame_flux.ko;
    }
    if(table == "extractionrcforce"){
      numeroColonneOk = iniValue.extractionrcforce.ok;
      numeroColonneKo = iniValue.extractionrcforce.ko;
    }
    if(table == "rcindeterminable"){
      numeroColonneOk = iniValue.rcindeterminable.ok;
      numeroColonneKo = iniValue.rcindeterminable.ko;
    }
    if(table == "suivisaisieprodite"){
      numeroColonneOk = iniValue.suivi_saisie_ite.ok;
      numeroColonneKo = iniValue.suivi_saisie_ite.ko;
    }
    if(table == "tramelamiestock"){
      numeroColonneOk = iniValue.trame_lamie_stock.ok;
      numeroColonneKo = iniValue.trame_lamie_stock.ko;
    }
    if(table == "favbalma"){
      numeroColonneOk = iniValue.favbalma.ok;
      numeroColonneKo = iniValue.favbalma.ko;
    }
    // if(table == "test1"){
    //   numeroColonneOk = iniValue.suivi_saisie_test1.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_test1.ko;
    // }
    if(table == "retourconventionsaisiedesconventions"){
      numeroColonneOk = iniValue.retourconventionsaisiedesconventions.ok;
      numeroColonneKo = iniValue.retourconventionsaisiedesconventions.ko;
    }
    if(table == "retourconventionsaisiedesconventions"){
      numeroColonneOk = iniValue.retourconventionsaisiedesconventions.ok;
      numeroColonneKo = iniValue.retourconventionsaisiedesconventions.ko;
    }
    // if(table == "test4"){
    //   numeroColonneOk = iniValue.suivi_saisie_test4.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_test4.ko;
    // }
    if(table == "majribcbtp"){
      numeroColonneOk = iniValue.majribcbtp.ok;
      numeroColonneKo = iniValue.majribcbtp.ko;
    }
    if(table == "ribtpmep"){
      numeroColonneOk = iniValue.ribtpmep.ok;
      numeroColonneKo = iniValue.ribtpmep.ko;
    }
    if(table == "ribtpmep"){
      numeroColonneOk = iniValue.ribtpmep.ok;
      numeroColonneKo = iniValue.ribtpmep.ko;
    }
    if(table == "curethermale"){
      numeroColonneOk = iniValue.curethermale.ok;
      numeroColonneKo = iniValue.curethermale.ko;
    }
    if(table == "majagapsinteramc"){
      numeroColonneOk = iniValue.majagapsinteramc.ok;
      numeroColonneKo = iniValue.majagapsinteramc.ko;
    }
    // if(table == "test10"){
    //   numeroColonneOk = iniValue.suivi_saisie_test10.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_test10.ko;
    // }
    if(table == "faveole"){
      numeroColonneOk = iniValue.faveole.ok;
      numeroColonneKo = iniValue.faveole.ko;
    }

    
    if(table == "retourreclamtramereclamationtiers"){
      numeroColonneOk = iniValue.retourreclamtramereclamationtiers.ok;
      numeroColonneKo = iniValue.retourreclamtramereclamationtiers.ko;
    }
    if(table == "reclamsetramereclamationse"){
      numeroColonneOk = iniValue.reclamsetramereclamationse.ok;
      numeroColonneKo = iniValue.reclamsetramereclamationse.ko;
    }
    // if(table == "essaie3"){
    //   numeroColonneOk = iniValue.suivi_saisie_essaie3.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_essaie3.ko;
    // }
    // if(table == "essaie4"){
    //   numeroColonneOk = iniValue.suivi_saisie_essaie4.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_essaie4.ko;
    // }
    if(table == "hospidemat"){
      numeroColonneOk = iniValue.hospidemat.ok;
      numeroColonneKo = iniValue.hospidemat.ko;
    }
    if(table == "extractionrcforce"){
      numeroColonneOk = iniValue.extractionrcforce.ok;
      numeroColonneKo = iniValue.extractionrcforce.ko;
    }
    if(table == "rcindeterminable"){
      numeroColonneOk = iniValue.rcindeterminable.ok;
      numeroColonneKo = iniValue.rcindeterminable.ko;
    }
    if(table == "dentaireretourfacturedentaireetcds"){
      numeroColonneOk = iniValue.dentaireretourfacturedentaireetcds.ok;
      numeroColonneKo = iniValue.dentaireretourfacturedentaireetcds.ko;
    }
    // if(table == "essaie9"){
    //   numeroColonneOk = iniValue.suivi_saisie_essaie9.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_essaie9.ko;
    // }
    if(table == "factureaudio"){
      numeroColonneOk = iniValue.factureaudio.ok;
      numeroColonneKo = iniValue.factureaudio.ko;
    }
    if(table == "retourhospipec"){
      numeroColonneOk = iniValue.retourhospipec.ok;
      numeroColonneKo = iniValue.retourhospipec.ko;
    }
    if(table == "retourpecdentaire"){
      numeroColonneOk = iniValue.retourpecdentaire.ok;
      numeroColonneKo = iniValue.retourpecdentaire.ko;
    }
    if(table == "retourpecoptique"){
      numeroColonneOk = iniValue.retourpecoptique.ok;
      numeroColonneKo = iniValue.retourpecoptique.ko;
    }
    if(table == "retourpecaudio"){
      numeroColonneOk = iniValue.retourpecaudio.ok;
      numeroColonneKo = iniValue.retourpecaudio.ko;
    }
    // if(table == "essaie15"){
    //   numeroColonneOk = iniValue.suivi_saisie_essaie15.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_essaie15.ko;
    // }
    if(table == "favmgefi"){
      numeroColonneOk = iniValue.favmgefi.ok;
      numeroColonneKo = iniValue.favmgefi.ko;
    }
    if(table == "favbalma"){
      numeroColonneOk = iniValue.favbalma.ok;
      numeroColonneKo = iniValue.favbalma.ko;
    }
    // if(table == "essaie18"){
    //   numeroColonneOk = iniValue.suivi_saisie_essaie18.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_essaie18.ko;
    // }
    if(table == "ribtpmep"){
      numeroColonneOk = iniValue.ribtpmep.ok;
      numeroColonneKo = iniValue.ribtpmep.ko;
    }
    if(table == "ribtpmep"){
      numeroColonneOk = iniValue.ribtpmep.ok;
      numeroColonneKo = iniValue.ribtpmep.ko;
    }
    if(table == "curethermale"){
      numeroColonneOk = iniValue.curethermale.ok;
      numeroColonneKo = iniValue.curethermale.ko;
    }
    // if(table == "essaie22"){
    //   numeroColonneOk = iniValue.suivi_saisie_essaie22.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_essaie22.ko;
    // }
    // if(table == "essaie23"){
    //   numeroColonneOk = iniValue.suivi_saisie_essaie23.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_essaie23.ko;
    // }
    if(table == "faveole"){
      numeroColonneOk = iniValue.faveole.ok;
      numeroColonneKo = iniValue.faveole.ko;
    }
    // if(table == "lignepack1"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignepack1.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignepack1.ko;
    // }
    // if(table == "lignepack2"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignepack2.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignepack2.ko;
    // }
    // if(table == "lignepack3"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignepack3.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignepack3.ko;
    // }
    // if(table == "lignepack4"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignepack4.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignepack4.ko;
    // }
    // if(table == "lignesante1"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignesante1.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignesante1.ko;
    // }
    // if(table == "lignesante2"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignesante2.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignesante2.ko;
    // }
    // if(table == "lignepackspe"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignepackspe.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignepackspe.ko;
    // }
    if(table == "noemiehtpmgefi"){
      numeroColonneOk = iniValue.noemiehtpmgefi.ok;
      numeroColonneKo = iniValue.noemiehtpmgefi.ko;
    }
    if(table == "mgefigtomgefirejetsaisienoemiehtp"){
      numeroColonneOk = iniValue.mgefigtomgefirejetsaisienoemiehtp.ok;
      numeroColonneKo = iniValue.mgefigtomgefirejetsaisienoemiehtp.ko;
    }
    // if(table == "lignemgefipack1"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignemgefipack1.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignemgefipack1.ko;
    // }
    if(table == "retourreclamtramereclamationtiers"){
      numeroColonneOk = iniValue.retourreclamtramereclamationtiers.ok;
      numeroColonneKo = iniValue.retourreclamtramereclamationtiers.ko;
    }
    if(table == "reclamsetramereclamationse"){
      numeroColonneOk = iniValue.reclamsetramereclamationse.ok;
      numeroColonneKo = iniValue.reclamsetramereclamationse.ko;
    }
    // if(table == "lignepubli3"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignepubli3.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignepubli3.ko;
    // }
    // if(table == "lignepubli4"){
    //   numeroColonneOk = iniValue.suivi_saisie_lignepubli4.ok;
    //   numeroColonneKo = iniValue.suivi_saisie_lignepubli4.ko;
    // }
    if(table == "optiquetramereclamationoptique"){
      numeroColonneOk = iniValue.optiquetramereclamationoptique.ok;
      numeroColonneKo = iniValue.optiquetramereclamationoptique.ko;
    }
    if(table == "reclamationaudio"){
      numeroColonneOk = iniValue.reclamationaudio.ok;
      numeroColonneKo = iniValue.reclamationaudio.ko;
    }


    
    var ok_ko = {};
    ok_ko.ok = numeroColonneOk;
    ok_ko.ko = numeroColonneKo;

    console.log("INI OK  ==================> "+ok_ko.ok);
    console.log("INI KO  ==================> "+ok_ko.ko);
    return ok_ko;
  },




};



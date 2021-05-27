/**
 * ContentieuxController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Contentieux = require("../models/Contentieux");

module.exports = {
    //Recherche colonne
    accueil : function(req,res)
    {
      var html= req.param("html");
      if(html=='o')
      {
        html= '<script>'+
        '$( document ).ready(function() {'+
        'tost();'+
        '});'+
        "function tost(){$('#toastk').toast('show');}</script>";
      };
      if(html=='x')
      {
        html= '<script>'+
        '$( document ).ready(function() {'+
        'tost();'+
        '});'+
        "function tost(){$('#toastd').toast('show');}</script>";
      };
      var jour = req.param("jour");
      var mois = req.param("mois");
      var annee = req.param("annee");
      var dateexport = jour + '/' + mois + '/' +annee;
      return res.view('reporting/exportErica', {date : dateexport , html : html});
    },
    rechercheColonne1 : function (req, res) {
     var html= '<script>'+
      '$( document ).ready(function() {'+
      'tost();'+
      '});'+
      "function tost(){$('.toast').toast('show');}</script>";
      //var html = '<h1>OK</h1>';
      return res.view('reporting/exportErica', { html : html});
      //res.view('reporting/exportErica')
    },
    rechercheColonne : function (req, res) {
      var jour = req.param("jour");
      var mois = req.param("mois");
      var annee = req.param("annee");
      var mois1 = 'Janvier' ;
      if(mois==01)
      {
        mois1= 'Janvier';
      };
      if(mois==02)
      {
        mois1= 'Fevrier';
      };
      if(mois==03)
      {
        mois1= 'Mars';
      };
      if(mois==04)
      {
        mois1= 'Avril';
      };
      if(mois==05)
      {
        mois1= 'Mai';
      };
      console.log(mois1);
      var date_export = jour + '/' + mois + '/' +annee;
      console.log("RECHERCHE COLONNE");
      async.series([
        function (callback) {
          Contentieux.countOkKo("contentieuxcbtp",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm1",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm2",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm3",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm4",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm5",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm6",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm7",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm8",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm9",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm10",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm11",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretouralm12",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretourcbtp1",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretourcbtp2",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretourcbtp3",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretourcbtp4",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretourcbtp5",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretourcbtp6",callback);
        },
        function (callback) {
            Contentieux.countOkKo("contentieuxretourcbtp7",callback);
        },
       
      ],function(err,result){
        if(err) return res.badRequest(err);
        console.log("Count OK CBTP ==> " + result[0].ok + " / " + result[0].ko);
        console.log("Count OK 2 ==> " + result[1].ok + " / " + result[1].ko);
        console.log("Count OK 3 ==> " + result[2].ok + " / " + result[2].ko);
        console.log("Count OK 4 ==> " + result[3].ok + " / " + result[3].ko);
        console.log("Count OK 5 ==> " + result[4].ok + " / " + result[4].ko);
        console.log("Count OK 6 ==> " + result[5].ok + " / " + result[5].ko);
        async.series([
          function (callback) {
            Contentieux.ecritureOkKo(result[0],"contentieuxcbtp",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[1],"contentieuxretouralm1",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[2],"contentieuxretouralm2",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[3],"contentieuxretouralm3",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[4],"contentieuxretouralm4",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[5],"contentieuxretouralm5",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[6],"contentieuxretouralm6",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[7],"contentieuxretouralm7",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[8],"contentieuxretouralm8",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[9],"contentieuxretouralm9",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[10],"contentieuxretouralm10",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[11],"contentieuxretouralm11",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo2(result[12],"contentieuxretouralm12",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo3(result[13],"contentieuxretourcbtp1",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo3(result[14],"contentieuxretourcbtp2",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo3(result[15],"contentieuxretourcbtp3",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo3(result[16],"contentieuxretourcbtp4",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo3(result[17],"contentieuxretourcbtp5",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo3(result[18],"contentieuxretourcbtp6",date_export,mois1,callback);
          },
          function (callback) {
            Contentieux.ecritureOkKo3(result[19],"contentieuxretourcbtp7",date_export,mois1,callback);
          },
        ],function(err,resultExcel){
       
            if(resultExcel[0]==true)
            {
              console.log("true zn");
              res.view('reporting/erera');
            }
            if(resultExcel[0]=='OK')
            {
              res.redirect('/exportContentieux/'+date_export+'/x')
            }
  
          
        })
      })
    },
  };


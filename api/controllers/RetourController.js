/**
 * RetourController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
          Retour.countOkKo("retourpubli",callback);
        },
       function (callback) {
          Retour.countOkKo("retoursante1",callback);
        },
        function (callback) {
          Retour.countOkKo("retoursante2",callback);
        },
        function (callback) {
          Retour.countOkKo("retoursante3",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto1",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto2",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto3",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto4",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto5",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto6",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto7",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto8",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto9",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto10",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmgto11",callback);
        },
       function (callback) {
          Retour.countOkKo("retouralmftp1",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmftp2",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmftp3",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmftp4",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmpackspe1",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmpackspe2",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmpackspe3",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmpackspe4",callback);
        },
        function (callback) {
          Retour.countOkKo("retouralmcbtpgto",callback);
        },
        function (callback) {
          Retour.countOkKo("retouretat1",callback);
        },
        function (callback) {
          Retour.countOkKo("retouretat2",callback);
        },
        function (callback) {
          Retour.countOkKo("retouretat3",callback);
        },
        function (callback) {
          Retour.countOkKo("retouretat4",callback);
        },
        function (callback) {
          Retour.countOkKo("retouretat5",callback);
        },
        function (callback) {
          Retour.countOkKo("retourpublipostage1",callback);
        },
        function (callback) {
          Retour.countOkKo("retourpublipostage2",callback);
        },
        function (callback) {
          Retour.countOkKo("retourpublipostage3",callback);
        },
        function (callback) {
          Retour.countOkKo("retourpublipostage4",callback);
        },
        function (callback) {
          Retour.countOkKo("retourpublipostage5",callback);
        },
        function (callback) {
          Retour.countOkKo("retourpublipostage6",callback);
        },
       
      ],function(err,result){
        if(err) return res.badRequest(err);
        console.log("Count OK trameFlux ==> " + result[0].ok + " / " + result[0].ko);
        // console.log("Count OK suivisaisielmde ==> " + result[1].ok + " / " + result[1].ko);
        // console.log("Count OK suivisaisiemgas ==> " + result[2].ok + " / " + result[2].ko);
        // console.log("Count OK suivisaisieprodite ==> " + result[3].ok + " / " + result[3].ko);
        // console.log("Count OK tramelamiestock ==> " + result[4].ok + " / " + result[4].ko);
        // console.log("Count OK tramelamiestockResiliation ==> " + result[5].ok + " / " + result[5].ko);
        async.series([
          function (callback) {
            Retour.ecritureOkKo(result[0],"retourpubli",date_export,mois1,callback);
          },
         function (callback) {
            Retour.ecritureOkKo2(result[1],"retoursante1",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo2(result[2],"retoursante2",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo2(result[3],"retoursante3",date_export,mois1,callback);
          },
        function (callback) {
            Retour.ecritureOkKo3(result[4],"retouralmgto1",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[5],"retouralmgto2",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[6],"retouralmgto3",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[7],"retouralmgto4",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[8],"retouralmgto5",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[9],"retouralmgto6",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[10],"retouralmgto7",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[11],"retouralmgto8",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[12],"retouralmgto9",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[13],"retouralmgto10",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo3(result[14],"retouralmgto11",date_export,mois1,callback);
          },
         function (callback) {
            Retour.ecritureOkKo4(result[15],"retouralmftp1",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo4(result[16],"retouralmftp2",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo4(result[17],"retouralmftp3",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo4(result[18],"retouralmftp4",date_export,mois1,callback);
          },
          function (callback) {
           Retour.ecritureOkKo5(result[19],"retouralmpackspe1",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo5(result[20],"retouralmpackspe2",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo5(result[21],"retouralmpackspe3",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo5(result[22],"retouralmpackspe4",date_export,mois1,callback);
          },
         function (callback) {
            Retour.ecritureOkKo6(result[23],"retouralmcbtpgto",date_export,mois1,callback);
          },
         function (callback) {
            Retour.ecritureOkKo7(result[24],"retouretat1",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo7(result[25],"retouretat2",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo7(result[26],"retouretat3",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo7(result[27],"retouretat4",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo7(result[28],"retouretat5",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo8(result[29],"retourpublipostage1",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo8(result[30],"retourpublipostage2",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo8(result[31],"retourpublipostage3",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo8(result[32],"retourpublipostage4",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo8(result[33],"retourpublipostage5",date_export,mois1,callback);
          },
          function (callback) {
            Retour.ecritureOkKo8(result[34],"retourpublipostage6",date_export,mois1,callback);
          },
        
        ],function(err,resultExcel){
       console.log(resultExcel[0]);
            if(resultExcel[0]==true)
            {
              console.log("true zn");
              res.view('reporting/erera');
            }
            if(resultExcel[0]=='OK')
            {
              res.redirect('/exportRetour/'+date_export+'/x')
            }
  
  
            /*console.log("Traitement terminé ===> "+ resultExcel[0]);
            console.log("Traitement terminé ===> "+ resultExcel[1]);
            console.log("Traitement terminé ===> "+ resultExcel[2]);
            console.log("Traitement terminé ===> "+ resultExcel[3]);
            console.log("Traitement terminé ===> "+ resultExcel[4]);
            var html = "Echec d'enregistrement";
            return res.redirect('/accueil');*/
            
          
          
        })
      })
    },
  };


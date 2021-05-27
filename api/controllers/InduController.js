/**
 * InduController
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
            Indu.countOkKo("indualm",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm1",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm2",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm3",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm4",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm5",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm6",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm7",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm8",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm9",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm10",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm11",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm12",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm13",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm14",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm15",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm16",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm17",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm18",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm19",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm20",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm21",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm22",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm23",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm24",callback);
        },
        function (callback) {
            Indu.countOkKo("indualm25",callback);
        },
        function (callback) {
            Indu.countOkKo("inducbtp1",callback);
        },
        function (callback) {
            Indu.countOkKo("inducbtp2",callback);
        },
        function (callback) {
            Indu.countOkKo("inducbtp3",callback);
        },
        function (callback) {
            Indu.countOkKo("inducbtp4",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm1",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm2",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm3",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm4",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm5",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm6",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm7",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm8",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm9",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm10",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm11",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm12",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm13",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm14",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm15",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm16",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm17",callback);
        },
        function (callback) {
            Indu.countOkKo("induretouralm18",callback);
        },
        function (callback) {
            Indu.countOkKo("induretoursante1",callback);
        },
        function (callback) {
            Indu.countOkKo("induretoursante2",callback);
        },
        function (callback) {
            Indu.countOkKo("induretourcbtp1",callback);
        },
        function (callback) {
            Indu.countOkKo("induretourcbtp2",callback);
        },
        function (callback) {
            Indu.countOkKo("induretourcbtp3",callback);
        },
        function (callback) {
            Indu.countOkKo("induretourcbtp4",callback);
        },

      ],function(err,result){
        if(err) return res.badRequest(err);
        console.log("Count OK 1 ==> " + result[0].ok + " / " + result[0].ko);
        console.log("Count OK 2 ==> " + result[1].ok + " / " + result[1].ko);
        console.log("Count OK 3 ==> " + result[2].ok + " / " + result[2].ko);
        console.log("Count OK 4 ==> " + result[3].ok + " / " + result[3].ko);
        console.log("Count OK 5 ==> " + result[4].ok + " / " + result[4].ko);
        console.log("Count OK 6 ==> " + result[5].ok + " / " + result[5].ko);
        console.log("Count OK @ ==> " + result[49].ok + " / " + result[49].ko);
        async.series([
          function (callback) {
            Indu.ecritureOkKo(result[0],"indualm",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[1],"indualm1",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[2],"indualm2",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[3],"indualm3",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[4],"indualm4",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[5],"indualm5",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[6],"indualm6",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[7],"indualm7",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[8],"indualm8",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[9],"indualm9",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[10],"indualm10",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[11],"indualm11",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[12],"indualm12",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[13],"indualm13",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[14],"indualm14",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[15],"indualm15",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[16],"indualm16",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[17],"indualm17",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[18],"indualm18",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[1],"indualm19",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[20],"indualm20",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[21],"indualm21",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[22],"indualm22",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[23],"indualm23",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[24],"indualm24",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo(result[25],"indualm25",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo2(result[26],"inducbtp1",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo2(result[27],"inducbtp2",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo2(result[28],"inducbtp3",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo2(result[29],"inducbtp4",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[30],"induretouralm1",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[31],"induretouralm2",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[32],"induretouralm3",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[33],"induretouralm4",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[34],"induretouralm5",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[35],"induretouralm6",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[36],"induretouralm7",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[37],"induretouralm8",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[38],"induretouralm9",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[39],"induretouralm10",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[40],"induretouralm11",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[41],"induretouralm12",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[42],"induretouralm13",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[43],"induretouralm14",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[44],"induretouralm15",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[45],"induretouralm16",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[46],"induretouralm17",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo3(result[47],"induretouralm18",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo4(result[48],"induretoursante1",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo4(result[49],"induretoursante2",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo5(result[50],"induretourcbtp1",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo5(result[51],"induretourcbtp2",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo5(result[52],"induretourcbtp3",date_export,mois1,callback);
          },
          function (callback) {
            Indu.ecritureOkKo5(result[53],"induretourcbtp4",date_export,mois1,callback);
          },


        ],function(err,resultExcel){
       
            if(resultExcel[0]==true)
            {
              console.log("true zn");
              res.view('reporting/erera');
            }
            if(resultExcel[0]=='OK')
            {
              res.redirect('/exportIndu/'+date_export+'/x')
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
  
  


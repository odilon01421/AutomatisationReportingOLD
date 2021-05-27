/**
 * InovcomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Inovcom = require("../models/Inovcom");

module.exports = {
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
RechercheColonne : function(req, res){
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
    console.log("tongaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    var date_export = jour + '/' + mois + '/' +annee;
    console.log(date_export);
    console.log("RECHERCHE COLONNE");
    async.series([
      function (callback) {
        Inovcom.countOkKo("trameflux",callback);
      },
      function (callback) {
        Inovcom.countOkKo("extractionrcforce",callback);
      },
      function (callback) {
        Inovcom.countOkKo("rcindeterminable",callback);
      },
      function (callback) {
        Inovcom.countOkKo("suivisaisieprodite",callback);
      },
      function (callback) {
        Inovcom.countOkKoTrameLamie("tramelamiestock",callback);
      },
      function (callback) {
        Inovcom.countOkKoTrameLamieResiliation("favbalma",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("test1",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("retourconventionsaisiedesconventions",callback);
      },
      function (callback) {
        Inovcom.countOkKo("retourconventionsaisiedesconventions",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("test4",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("majribcbtp",callback);
      },
      function (callback) {
        Inovcom.countOkKo("ribtpmep",callback);
      },
      function (callback) {
        Inovcom.countOkKo("ribtpmep",callback);
      },
      function (callback) {
        Inovcom.countOkKo("curethermale",callback);
      },
      function (callback) {
        Inovcom.countOkKo("majagapsinteramc",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("test10",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("faveole",callback);
      },
      function (callback) {
        Inovcom.countOkKo("retourreclamtramereclamationtiers",callback);
      },
      function (callback) {
        Inovcom.countOkKo("reclamsetramereclamationse",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("essaie3",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("essaie4",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("hospidemat",callback);
      },
      function (callback) {
        Inovcom.countOkKo("extractionrcforce",callback);
      },
      function (callback) {
        Inovcom.countOkKo("rcindeterminable",callback);
      },
      function (callback) {
        Inovcom.countOkKo("dentaireretourfacturedentaireetcds",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("essaie9",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("factureaudio",callback);
      },
      function (callback) {
        Inovcom.countOkKo("retourhospipec",callback);
      },
      function (callback) {
        Inovcom.countOkKo("retourpecdentaire",callback);
      },
      function (callback) {
        Inovcom.countOkKo("retourpecoptique",callback);
      },
      function (callback) {
        Inovcom.countOkKo("retourpecaudio",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("essaie15",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("favmgefi",callback);
      },
      function (callback) {
        Inovcom.countOkKo("favbalma",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("essaie18",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("ribtpmep",callback);
      },
      function (callback) {
        Inovcom.countOkKo("ribtpmep",callback);
      },
      function (callback) {
        Inovcom.countOkKo("curethermale",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("essaie22",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("essaie23",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("faveole",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("lignepack1",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("lignepack2",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("lignepack3",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("lignepack4",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("lignesante1",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("lignesante2",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("lignepackspe",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("noemiehtpmgefi",callback);
      },
      function (callback) {
        Inovcom.countOkKo("mgefigtomgefirejetsaisienoemiehtp",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("lignemgefipack1",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("retourreclamtramereclamationtiers",callback);
      },
      function (callback) {
        Inovcom.countOkKo("reclamsetramereclamationse",callback);
      },
      // function (callback) {
      //   Inovcom.countOkKo("lignepubli3",callback);
      // },
      // function (callback) {
      //   Inovcom.countOkKo("lignepubli4",callback);
      // },
      function (callback) {
        Inovcom.countOkKo("optiquetramereclamationoptique",callback);
      },
      function (callback) {
        Inovcom.countOkKo("reclamationaudio",callback);
      },

      ],function(err,result){
      if(err) return res.badRequest(err);
      console.log("Count OK trameFlux ==> " + result[0].ok + " / " + result[0].ko);
      console.log("Count OK suivisaisielmde ==> " + result[1].ok + " / " + result[1].ko);
      console.log("Count OK suivisaisiemgas ==> " + result[2].ok + " / " + result[2].ko);
      console.log("Count OK suivisaisieprodite ==> " + result[3].ok + " / " + result[3].ko);
      console.log("Count OK tramelamiestock ==> " + result[4].ok + " / " + result[4].ko);
      console.log("Count OK tramelamiestocknr ==> " + result[5].ok + " / " + result[5].ko);
     console.log("Count OK test1 ==> " + result[6].ok + " / " + result[6].ko);
      console.log("Count OK test2 ==> " + result[7].ok + " / " + result[7].ko);
      console.log("Count OK test3 ==> " + result[8].ok + " / " + result[8].ko);
      console.log("Count OK test4 ==> " + result[9].ok + " / " + result[9].ko);
      console.log("Count OK test5 ==> " + result[10].ok + " / " + result[10].ko);
      console.log("Count OK test6 ==> " + result[11].ok + " / " + result[11].ko);
      console.log("Count OK test7 ==> " + result[12].ok + " / " + result[12].ko);
      console.log("Count OK test8 ==> " + result[13].ok + " / " + result[13].ko);
      console.log("Count OK test9 ==> " + result[14].ok + " / " + result[14].ko);
      console.log("Count OK test10 ==> " + result[15].ok + " / " + result[15].ko);
      console.log("Count OK test11 ==> " + result[16].ok + " / " + result[16].ko);
      console.log("Count OK essaie1 ==> " + result[17].ok + " / " + result[17].ko);
      console.log("Count OK essaie2 ==> " + result[18].ok + " / " + result[18].ko);
      console.log("Count OK essaie3 ==> " + result[19].ok + " / " + result[19].ko);
      console.log("Count OK essaie4 ==> " + result[20].ok + " / " + result[20].ko);
      console.log("Count OK essaie5 ==> " + result[21].ok + " / " + result[21].ko);
      // console.log("Count OK essaie22 ==> " + result[38].ok + " / " + result[38].ko);
      // console.log("Count OK essaie23 ==> " + result[39].ok + " / " + result[39].ko);
      // console.log("Count OK lignepack1 ==> " + result[41].ok + " / " + result[41].ko);
      // console.log("Count OK lignepackspe ==> " + result[47].ok + " / " + result[47].ko);
      console.log("Count OK 36 ==> " + result[36].ok + " / " + result[36].ko);
      async.series([
        function (callback) {
          Inovcom.ecritureOkKo(result[0],"trameflux",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[1],"extractionrcforce",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[2],"rcindeterminable",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[3],"suivisaisieprodite",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[4],"favbalma",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[5],"tramelamiestock",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo(result[6],"test1",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo(result[6],"retourconventionsaisiedesconventions",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[7],"retourconventionsaisiedesconventions",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo(result[9],"test4",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo(result[8],"majribcbtp",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[9],"ribtpmep",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[10],"ribtpmep",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[11],"curethermale",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo(result[12],"majagapsinteramc",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo(result[15],"test10",date_export,mois1,callback);
        // },
   function (callback) {
          Inovcom.ecritureOkKo(result[13],"faveole",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[14],"retourreclamtramereclamationtiers",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[15],"reclamsetramereclamationse",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo2(result[19],"essaie3",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo2(result[20],"essaie4",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo2(result[16],"hospidemat",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[17],"extractionrcforce",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[18],"rcindeterminable",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[19],"dentaireretourfacturedentaireetcds",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo2(result[25],"essaie9",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo2(result[20],"factureaudio",date_export,mois1,callback);
        },      
        function (callback) {
          Inovcom.ecritureOkKo2(result[21],"retourhospipec",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[22],"retourpecdentaire",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[23],"retourpecoptique",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[24],"retourpecaudio",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo2(result[31],"essaie15",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo2(result[25],"favmgefi",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[26],"favbalma",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo2(result[34],"essaie18",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo2(result[27],"ribtpmep",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo2(result[28],"ribtpmep",date_export,mois1,callback);
        },   
        function (callback) {
          Inovcom.ecritureOkKo2(result[29],"curethermale",date_export,mois1,callback);
        }, 
        // function (callback) {
        //   Inovcom.ecritureOkKo2(result[38],"essaie22",date_export,mois1,callback);
        // }, 
        // function (callback) {
        //   Inovcom.ecritureOkKo2(result[39],"essaie23",date_export,mois1,callback);
        // }, 
        function (callback) {
          Inovcom.ecritureOkKo2(result[30],"faveole",date_export,mois1,callback);
        },    
        // function (callback) {
        //   Inovcom.ecritureOkKo3(result[41],"lignepack1",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo3(result[42],"lignepack2",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo3(result[43],"lignepack3",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo3(result[44],"lignepack4",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo4(result[45],"lignesante1",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo4(result[46],"lignesante2",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo5(result[47],"lignepackspe",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo6(result[31],"noemiehtpmgefi",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo6(result[32],"mgefigtomgefirejetsaisienoemiehtp",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo7(result[50],"lignemgefipack1",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo8(result[33],"retourreclamtramereclamationtiers",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo8(result[34],"reclamsetramereclamationse",date_export,mois1,callback);
        },
        // function (callback) {
        //   Inovcom.ecritureOkKo8(result[53],"lignepubli3",date_export,mois1,callback);
        // },
        // function (callback) {
        //   Inovcom.ecritureOkKo8(result[54],"lignepubli4",date_export,mois1,callback);
        // },
        function (callback) {
          Inovcom.ecritureOkKo8(result[35],"optiquetramereclamationoptique",date_export,mois1,callback);
        },
        function (callback) {
          Inovcom.ecritureOkKo8(result[36],"reclamationaudio",date_export,mois1,callback);
        },

      ],function(err,resultExcel){
     
          if(resultExcel[0]==true)
          {
            console.log(resultExcel);
            console.log("true zn");
            res.view('reporting/erera');
          }
          if(resultExcel[0]=='OK')
          {
            res.redirect('/export58/'+date_export+'/x')
          }


          // console.log("Traitement terminé ===> "+ resultExcel[0]);
          // console.log("Traitement terminé ===> "+ resultExcel[1]);
          // console.log("Traitement terminé ===> "+ resultExcel[2]);
          // console.log("Traitement terminé ===> "+ resultExcel[3]);
          // console.log("Traitement terminé ===> "+ resultExcel[4]);
          // var html = "Echec d'enregistrement";
          // return res.redirect('/accueil');
          
        
        
      })
    })
  
    }
};


/**
 * ReportingExcelController
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
    // return res.view('reporting/exportExcel', {date : dateexport , html : html});
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
        ReportingExcel.countOkKo("trameflux",callback);
      },
      function (callback) {
        ReportingExcel.countOkKo("suivisaisielmde",callback);
      },
      function (callback) {
        ReportingExcel.countOkKo("suivisaisiemgas",callback);
      },
      function (callback) {
        ReportingExcel.countOkKo("suivisaisieprodite",callback);
      },
      function (callback) {
        ReportingExcel.countOkKoTrameLamie("tramelamiestock",callback);
      },
      function (callback) {
        ReportingExcel.countOkKoTrameLamieResiliation("tramelamiestock",callback);
      }
    ],function(err,result){
      if(err) return res.badRequest(err);
      console.log("Count OK trameFlux ==> " + result[0].ok + " / " + result[0].ko);
      console.log("Count OK suivisaisielmde ==> " + result[1].ok + " / " + result[1].ko);
      console.log("Count OK suivisaisiemgas ==> " + result[2].ok + " / " + result[2].ko);
      console.log("Count OK suivisaisieprodite ==> " + result[3].ok + " / " + result[3].ko);
      console.log("Count OK tramelamiestock ==> " + result[4].ok + " / " + result[4].ko);
      console.log("Count OK tramelamiestockResiliation ==> " + result[5].ok + " / " + result[5].ko);
      async.series([
        function (callback) {
          ReportingExcel.ecritureOkKo(result[0],"trameflux",date_export,mois1,callback);
        },
        function (callback) {
          ReportingExcel.ecritureOkKo(result[1],"suivisaisielmde",date_export,mois1,callback);
        },
        function (callback) {
          ReportingExcel.ecritureOkKo(result[2],"suivisaisiemgas",date_export,mois1,callback);
        },
        function (callback) {
          ReportingExcel.ecritureOkKo(result[3],"suivisaisieprodite",date_export,mois1,callback);
        },
        function (callback) {
          ReportingExcel.ecritureOkKo(result[4],"tramelamiestocknr",date_export,mois1,callback);
        },
        function (callback) {
          ReportingExcel.ecritureOkKo(result[5],"tramelamiestock",date_export,mois1,callback);
        },
      ],function(err,resultExcel){
     
          if(resultExcel[0]==true)
          {
            console.log("true zn");
            res.view('reporting/erera');
          }
          if(resultExcel[0]=='OK')
          {
            res.redirect('/export/'+date_export+'/x')
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
  calendrier : function(req, res){
    return res.view('reporting/exportExcel');
  }
};


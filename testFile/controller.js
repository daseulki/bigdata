var markerController = (function(){

})();

var UIController = (function(){
  /* 맵 랜더링 하기 */
  var SOPPlugin
  var map = null; //화면에 표시되는 지도..
  vworld.showMode = false;
  vworld.init(
    "mainMap", "map-first",
    function() {
      map = this.vmap;
      map.setBaseLayer(map.vworldBaseMap);
      map.setControlsType({
        "simpleMap": true
      });
      map.addVWORLDControl("zoomBar");
      map.setCenterAndZoom(14125792.221619, 4506789.1730147, 14); //회사 좌표..

    },
    function(obj) {
      SOPPlugin = obj;
    } //성공
    ,
    function(msg) {
      alert('fail');
    } //실패
  );

  function setModeCallback() {
    vworld.setModeCallback(modecallback);
  }

  function setTestProxy() {
    alert(OpenLayers.ProxyHost);
  }



    var DOMstrings = {
      do : "'광역시도','LT_C_ADSIDO'",
      si : "'시군구','LT_C_ADSIGG'",
      eub : "'읍면동','LT_C_ADEMD'",
      jijuk : "'지적도','LP_PA_CBND_BUBUN,LP_PA_CBND_BONBUN'"
    }


  return {
    getDOMstrings: function() {
      return DOMstrings;
    },


    // fnChangeHybridVisibility: function() {
    //     return  map.vworldHybrid.setVisibility(!map.vworldHybrid.getVisibility());
    //   },

    addThemeLayer: function(title, layer) {
        return map.showThemeLayer(title, {
          layers: layer
        });
      }

    // addTileCache: function() {
    //     return map.showTileCacheLayer('산사태위험지도', 'SANSATAI', {
    //       min: 9,
    //       max: 15
    //     });
    //   }

  }
})();

var appController = (function(markerController,UIController){

/* 이벤트 컨트롤하기.. */


  var setupEventListeners = function(){
    var DOM = UIController.getDOMstrings();

    document.getElementById("mode0").addEventListener('click',vworld.setMode(0));
    document.getElementById("mode1").addEventListener('click',vworld.setMode(1));

    document.getElementById("do").addEventListener('click',addThemeLayer(DOM.do));
    document.getElementById("si").addEventListener('click',addThemeLayer(DOM.si));
    document.getElementById("eub").addEventListener('click',addThemeLayer(DOM.eub));
    document.getElementById("jijuk").addEventListener('click',addThemeLayer(DOM.jijuk));
  }

  return {
    init: function() {
      console.log("app start!");
      setupEventListeners();
    }
  }

})(markerController,UIController);


appController.init();

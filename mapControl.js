///////////////////////////좌표환산/////////////////////////
//ol.proj.transform([126.9380517322744,37.16792263658907], 'EPSG:4326', 'EPSG:900913')
////////////////////////////////////////////////////////////


var SOPPlugin
var map = null;
vworld.showMode = false;
var mControl; //마커이벤트변수
var tempMarker = new Array(); //임시마커
var tempScope = new Array();

vworld.init(
  "cont1", "map-first",
  function() {
    map = this.vmap;
    map.setBaseLayer(map.vworldBaseMap);
    map.setControlsType({
      "simpleMap": true
    });
    map.addVWORLDControl("zoomBar")
    map.setCenterAndZoom(14125792.221619, 4506789.1730147, 14);
    //     //기존 클릭이벤트 해제
    //     map.events.unregister('click', map, map.onMapClicked);
    // //신규 클릭이벤트 부여
    //     map.events.register('click', map, addMarkingEvent);
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

function fnChangeHybridVisibility() {
  map.vworldHybrid.setVisibility(!map.vworldHybrid.getVisibility());
}

function addThemeLayer(title, layer) {
  map.showThemeLayer(title, {
    layers: layer
  });
}

function addTileCache() {
  map.showTileCacheLayer('산사태위험지도', 'SANSATAI', {
    min: 9,
    max: 15
  });
}

function setTestProxy() {
  alert(OpenLayers.ProxyHost);
}

function jsSample1ex(name, visibility) {
  if (SOPPlugin != null) {
    var str = "";
    var SOPLayerList = SOPPlugin.getLayerList();
    var vis = SOPLayerList.getVisible(name);
    if (visibility == true) {
      vis = SOPPlugin.SOPVISIBLE_ON;
    } else {
      vis = SOPPlugin.SOPVISIBLE_OFF;
    }
    SOPLayerList.setVisible(name, vis);
  }
}

function setDirection() {
  if (SOPPlugin != null) {
    var SOPCamera = SOPPlugin.getViewCamera();
    SOPCamera.setDirect(-5);
  }
}

function makeSymbol() {

  if (SOPPlugin != null) {
    SOPPlugin.getViewCamera().moveLonLat(127.0405, 37.5016); //카메라가 이동할 경도와 위도
    SOPPlugin.getViewCamera().setAltitude(500); //카메라가 이동할 고도
    var vec3 = SOPPlugin.createVec3();
    poi = SOPPlugin.createPoint('999');
    vec3.Longitude = 127.0405; //심볼이 생설될 위치의 경도
    vec3.Latitude = 37.5016; //심볼이 생성될 위치의 위도
    vec3.Altitude = 0; //심볼이 생성될 위치의 고도
    poi.Set(vec3);
    var sym = poi.getSymbol();
    var icon = sym.getIcon();
    icon.setNormalIcon('http://www.vworld.kr/images/op02/map_point.png'); //심볼 아이콘 주소
    sym.setIcon(icon);
    poi.setName("테스트"); //심볼 아이콘 이름
    poi.setSymbol(sym);
    SOPPlugin.getView().addChild(poi, 8);
  }
}

function createPlacemark() {
  var va, vNum, pt;
  vNum = SOPPlugin.getView().getInputPointCount();
  if (vNum < 1) return;
  va = SOPPlugin.getView().getInputPointList();
  pt = va.get(0);
  var poi, symbolizdPoi;
  var objId = "1";
  poi = SOPPlugin.createPoint(objId);
  poi.Set(pt)
  var sym = poi.getSymbol();
  var icon = sym.getIcon();
  icon.setNormalIcon("http://vworld.kr/images/op02/map_point.png"); //플레이스마크 아이콘 주소
  sym.setIcon(icon);
  poi.setSymbol(sym);
  poi.setName("이름없는 Placemark"); //플레이스마크 아이콘 이름
  SOPPlugin.getView().addChild(poi, 8);
  SOPPlugin.getView().setWorkMode(sop.cons.mouseState.SOPMOUSE_MOVEGRAB)
}

function removeObj() {
  alert("삭제할 객체를 선택하여 주십시오.");
  window.sop.earth.addEventListener(SOPPlugin.getUserLayer(), "lmouseup", removeObjEvent);
}

function removeObjEvent(event) {
  var type = "";
  if (event.getTarget() != null) {
    if (event.getTarget().getType() == "SOPPoint") {
      removeObj = event.getTarget();
      if (removeObj) {
        SOPPlugin.getUserLayer().removeAtObject(removeObj);
        SOPPlugin.getView().MapRender();
      }
    }
  }
}

function createPolygon() {
  var va, vNum;
  vNum = SOPPlugin.getView().getInputPointCount();
  if (vNum < 3) return;
  va = SOPPlugin.getView().getInputPointList();
  var objId = "1";
  rect = SOPPlugin.createPolygon(objId);
  rect.setCoordinates(va);
  var polyStyle;
  polyStyle = rect.getStyle();
  var sopColor;
  var sopColor = polyStyle.getOutlineColor();
  sopColor.setARGB(255, 232, 83, 228); //폴리곤의 색깔
  polyStyle.setOutLineColor(sopColor);
  var sopFillColor = polyStyle.getFillColor();
  sopFillColor.setARGB(255, 64, 216, 20); //폴리곤 테두리의 색깔
  polyStyle.setFillColor(sopFillColor);
  polyStyle.setOutlineWidth(10.0); //폴리곤 테두리의 두께
  rect.setStyle(polyStyle);
  SOPPlugin.getView().clearInputPoint();
  SOPPlugin.getView().addChild(rect, 13);
  SOPPlugin.getView().setWorkMode(sop.cons.mouseState.SOPMOUSE_MOVEGRAB);
}

 
/**
 * 마커 찍기
 */
function addMarkingEvent() {    
  var pointOptions = {
    persist: true
  }; //포인트옵션
      
  if (mControl == null) { //마커컨트롤이 정의 되어 있지 않으면
            
    mControl =             new OpenLayers.Control.Measure(OpenLayers.Handler.Point, {
      handlerOptions: pointOptions
    }); //포인트 객체 생성
            
    mControl.events.on({
      "measure": mClick
    }); //객체를 클릭이벤트 등록
            
    map.addControl(mControl); //나의 map에 객체 추가
        
  }           
  map.init(); //나의 맵 초기화
      
  mControl.activate(); //마커컨트롤 활성화
}
/**
 * 말풍선이벤트
 */
var num = 1;

function mClick(event) {
  map.init(); //나의 맵 초기화
  var temp = event.geometry; //마커 클릭이벤트시 나오는 좌표
  var pos = new OpenLayers.LonLat(temp.x, temp.y); //좌표값 셋팅
  geocoder_reverse(pos.lon, pos.lat);
  var msg = num + 1 + "번 마커 <br>" + add + "<br>x: " + temp.x + "<br>y: " + temp.y;
  addMarker(pos.lon, pos.lat, msg, null); //말풍선

}


var myradius = 1000;

function setradius() {
  var rad = document.getElementById("rad").value;
  myradius = rad;
  console.log("myradius is chaged to" + rad);
}
/**
 * 말풍선결과
 */
var num = 0;

function colorChange(group) {
  var style_orange = {
    strokeColor: "#ff7300",
    strokeOpacity: 0.6,
    strokeWidth: 1,
    fillColor: "#ff7300",
    fillOpacity: 0.2
  };

  var style_blue = {
    strokeColor: "#0021ff",
    strokeOpacity: 0.5,
    strokeWidth: 1,
    fillColor: "#0021ff",
    fillOpacity: 0.1
  }
  var style_violet = {
    strokeColor: "#c400ff",
    strokeOpacity: 0.5,
    strokeWidth: 1,
    fillColor: "#c400ff",
    fillOpacity: 0.1
  }

  if (group == "grp1") {
    return style_orange;
  } else if (group == "grp2") {
    return style_blue;
  } else {
    return style_violet;
  }
}

function addMarker(lon, lat, message, imgurl) {
  setradius();
  var group = document.getElementById("markerGroup").value;
  var scope = new vworld.Circle({
    x: lon,
    y: lat
  }, myradius, colorChange(group));

  var marker = new vworld.Marker(lon, lat, message, "");
  // 마커 아이콘 이미지 파일명 설정합니다.
  if (typeof imgurl == 'string') {
    marker.setIconImage(imgurl);
  }

  // 마커의 z-Index 설정
  marker.setZindex(3);
  marker.id = "marker" + num;
  // marker.setDragMode(true);
  map.addMarker(marker);
  tempMarker[num] = marker;
  tempScope[num] = scope;

  // console.log(tempMarker); //OBJ반환
  var markList = document.getElementById("markerList");
  var markOption = document.createElement("option");
  markOption.text = num + 1 + "번 마커";
  markOption.value = num;
  markList.options.add(markOption);
  num += 1;
}

function mhide() {
  var checkedOption = document.getElementById("markerList").value;
  tempMarker[checkedOption].hide();
  tempScope[checkedOption].setRadius(0);
}

function mshow() {
  var checkedOption = document.getElementById("markerList").value;
  tempMarker[checkedOption].show();
  tempScope[checkedOption].setRadius(myradius);
}

function mdelete() { ////////만들어야됨!!!!!!!!!!!!!!!!!
  var checkedOption = document.getElementById("markerList");
  tempMarker[checkedOption].hide();
  tempScope[checkedOption].setRadius(0);
  checkedOption.remove[checkedOption.selectedIndex];

}

function resetAll() {
  var checkedOption = document.getElementById("markerList").value;
  map.initAll();
  num = 0;
  markerList.options.length = 0;
}

////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/*주소 -> 좌표*/
var geocoder = function(name) {
  $.ajax({
    type: "get",
    url: "http://api.vworld.kr/req/address?service=address&version=2.0&request=getcoord&format=json&type=parcel",
    data: {
      apiKey: $('[name=apiKey]').val(),
      address: name
    },
    dataType: 'jsonp',
    success: function(data) {
      // result= data;
      // move(data.response.result.point.x*1,data.response.result.point.y*1,11);
      // var point = ol.proj.transform([ data.response.result.point.x*1, data.response.result.point.y*1],'EPSG:4326', "EPSG:900913");
      // dataAjax(point[0],point[1]);
    },
    beforeSend: function() {
      $('#loading').text("로딩중....");
    },

    error: function(xhr, stat, err) {}
  });
}

/*좌표 -> 주소*/
var geocoder_reverse = function(x, y) {
  $.ajax({
    type: "get",
    url: "http://api.vworld.kr/req/address?service=address&version=2.0&request=getaddress&format=json&type=parcel&crs=epsg:900913",
    data: {
      apiKey: $('[name=apiKey]').val(),
      point: x + "," + y
    },
    dataType: 'jsonp',
    success: function(data) {
      var geoResult = "";
      for (i in data.response.result) {
        geoResult += data.response.result[i].text;
      }
      $('#geoAddress').text(geoResult);
      add = geoResult;
      console.log("1 " + add);
    },
    beforeSend: function() {},

    error: function(xhr, stat, err) {}

  });
}

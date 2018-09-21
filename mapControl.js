///////////////////////////좌표환산/////////////////////////
//ol.proj.transform([126.9380517322744,37.16792263658907], 'EPSG:4326', 'EPSG:900913')
////////////////////////////////////////////////////////////


var SOPPlugin
var map = null;
vworld.showMode = false;
var mControl; //마커이벤트변수
var tempMarker = new Array(); //임시마커
var tempScope = new Array();
var groupMarker;
var groupName;


window.onload = function() {

  groupMarker = new vworld.GroupMarker('lora');
  groupMarker = new vworld.GroupMarker('wifi');
  groupMarker = new vworld.GroupMarker('ble');
  console.log('added groupMarker');
}


vworld.init(
  "mainMap", "map-first",
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

// function fnChangeHybridVisibility() {
//   map.vworldHybrid.setVisibility(!map.vworldHybrid.getVisibility());
// }

function addThemeLayer(title, layer) {
  map.showThemeLayer(title, {
    layers: layer
  });
}

// function addTileCache() {
//   map.showTileCacheLayer('산사태위험지도', 'SANSATAI', {
//     min: 9,
//     max: 15
//   });
// }

function setTestProxy() {
  alert(OpenLayers.ProxyHost);
}

//
// function jsSample1ex(name, visibility) {
//   if (SOPPlugin != null) {
//     var str = "";
//     var SOPLayerList = SOPPlugin.getLayerList();
//     var vis = SOPLayerList.getVisible(name);
//     if (visibility == true) {
//       vis = SOPPlugin.SOPVISIBLE_ON;
//     } else {
//       vis = SOPPlugin.SOPVISIBLE_OFF;
//     }
//     SOPLayerList.setVisible(name, vis);
//   }
// }
//
// function setDirection() {
//   if (SOPPlugin != null) {
//     var SOPCamera = SOPPlugin.getViewCamera();
//     SOPCamera.setDirect(-5);
//   }
// }
//
// function makeSymbol() {
//
//   if (SOPPlugin != null) {
//     SOPPlugin.getViewCamera().moveLonLat(127.0405, 37.5016); //카메라가 이동할 경도와 위도
//     SOPPlugin.getViewCamera().setAltitude(500); //카메라가 이동할 고도
//     var vec3 = SOPPlugin.createVec3();
//     poi = SOPPlugin.createPoint('999');
//     vec3.Longitude = 127.0405; //심볼이 생설될 위치의 경도
//     vec3.Latitude = 37.5016; //심볼이 생성될 위치의 위도
//     vec3.Altitude = 0; //심볼이 생성될 위치의 고도
//     poi.Set(vec3);
//     var sym = poi.getSymbol();
//     var icon = sym.getIcon();
//     icon.setNormalIcon('http://www.vworld.kr/images/op02/map_point.png'); //심볼 아이콘 주소
//     sym.setIcon(icon);
//     poi.setName("테스트"); //심볼 아이콘 이름
//     poi.setSymbol(sym);
//     SOPPlugin.getView().addChild(poi, 8);
//   }
// }
//
// function createPlacemark() {
//   var va, vNum, pt;
//   vNum = SOPPlugin.getView().getInputPointCount();
//   if (vNum < 1) return;
//   va = SOPPlugin.getView().getInputPointList();
//   pt = va.get(0);
//   var poi, symbolizdPoi;
//   var objId = "1";
//   poi = SOPPlugin.createPoint(objId);
//   poi.Set(pt)
//   var sym = poi.getSymbol();
//   var icon = sym.getIcon();
//   icon.setNormalIcon("http://vworld.kr/images/op02/map_point.png"); //플레이스마크 아이콘 주소
//   sym.setIcon(icon);
//   poi.setSymbol(sym);
//   poi.setName("이름없는 Placemark"); //플레이스마크 아이콘 이름
//   SOPPlugin.getView().addChild(poi, 8);
//   SOPPlugin.getView().setWorkMode(sop.cons.mouseState.SOPMOUSE_MOVEGRAB)
// }
//
// function removeObj() {
//   alert("삭제할 객체를 선택하여 주십시오.");
//   window.sop.earth.addEventListener(SOPPlugin.getUserLayer(), "lmouseup", removeObjEvent);
// }
//
// function removeObjEvent(event) {
//   var type = "";
//   if (event.getTarget() != null) {
//     if (event.getTarget().getType() == "SOPPoint") {
//       removeObj = event.getTarget();
//       if (removeObj) {
//         SOPPlugin.getUserLayer().removeAtObject(removeObj);
//         SOPPlugin.getView().MapRender();
//       }
//     }
//   }
// }
//
// function createPolygon() {
//   var va, vNum;
//   vNum = SOPPlugin.getView().getInputPointCount();
//   if (vNum < 3) return;
//   va = SOPPlugin.getView().getInputPointList();
//   var objId = "1";
//   rect = SOPPlugin.createPolygon(objId);
//   rect.setCoordinates(va);
//   var polyStyle;
//   polyStyle = rect.getStyle();
//   var sopColor;
//   var sopColor = polyStyle.getOutlineColor();
//   sopColor.setARGB(255, 232, 83, 228); //폴리곤의 색깔
//   polyStyle.setOutLineColor(sopColor);
//   var sopFillColor = polyStyle.getFillColor();
//   sopFillColor.setARGB(255, 64, 216, 20); //폴리곤 테두리의 색깔
//   polyStyle.setFillColor(sopFillColor);
//   polyStyle.setOutlineWidth(10.0); //폴리곤 테두리의 두께
//   rect.setStyle(polyStyle);
//   SOPPlugin.getView().clearInputPoint();
//   SOPPlugin.getView().addChild(rect, 13);
//   SOPPlugin.getView().setWorkMode(sop.cons.mouseState.SOPMOUSE_MOVEGRAB);
// }
//
//




function slideLeft(){
  var btn = document.getElementById('mapCheckbox');
  btn.classList.toggle("slideleft");

}
function slideUp(){
  var btn = document.getElementById('markerMaker');
  btn.classList.toggle("slideup");
  // console.log('upup')
}



/**
 * 마커 찍기
 */

//
// function mapLayeringEvent(){
//   var mode0 = document.getElementById("mode0");
//   mode0.addEventListener('click',vworld.setMode(0),false);
//   var mode1= document.getElementById("mode1");
//   mode1.addEventListener('click',vworld.setMode(1),false);
//   var dosi =document.getElementById("do");
//   dosi.addEventListener('click',addThemeLayer('광역시도','LT_C_ADSIDO'),false);
//   var si = document.getElementById("si");
//   si.addEventListener('click',addThemeLayer('시군구','LT_C_ADSIGG'),false);
//   var eub = document.getElementById("eub");
//   eub.addEventListener('click',addThemeLayer('읍면동','LT_C_ADEMD'),false);
//   var jijuk = document.getElementById("jijuk");
//   jijuk.addEventListener('click',addThemeLayer('지적도','LP_PA_CBND_BUBUN,LP_PA_CBND_BONBUN'),false);
// };

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

function mClick(event) {
  map.init(); //나의 맵 초기화
  var temp = event.geometry; //마커 클릭이벤트시 나오는 좌표
  var pos = new OpenLayers.LonLat(temp.x, temp.y); //좌표값 셋팅

  geocoder_reverse(pos.lon, pos.lat);
  //말풍선
}

var myradius = 1000; //초기값
var num = 0;
var add = "";


function setRadius() {
  var rad = document.getElementById("rad").value;
  if (rad != "") myradius = rad;
  // console.log("myradius is chaged to" + rad);
}

function colorChange(group) {
  var style_orange = {
    strokeColor: "#ff6300",
    strokeOpacity: 0.6,
    strokeWidth: 1,
    fillColor: "#ff6300",
    fillOpacity: 0.2
  };

  var style_blue = {
    strokeColor: "#0021ff",
    strokeOpacity: 0.6,
    strokeWidth: 1,
    fillColor: "#0021ff",
    fillOpacity: 0.2
  }
  var style_violet = {
    strokeColor: "#c400ff",
    strokeOpacity: 0.6,
    strokeWidth: 1,
    fillColor: "#c400ff",
    fillOpacity: 0.2
  }

  if (group == "lora") {
    return style_orange;
  } else if (group == "wifi") {
    return style_blue;
  } else {
    return style_violet;
  }
}

function addMarker(group, lon, lat, message, imgurl) {
  setRadius();
  this.group = group;
  var scope = {
    circle: new vworld.Circle({
    x: lon,
    y: lat
  }, myradius, colorChange(group)),
  groupName: group

};

  var marker = groupMarker.addMarker(group, lon, lat, message, "");
  // 마커 아이콘 이미지 파일명 설정합니다.

  if (typeof imgurl == 'string') {
    marker.setIconImage(imgurl);
  }

  // 마커의 z-Index 설정
  marker.setZindex(3);
  marker.id = num;
  // marker.setDragMode(true);
  map.addMarker(marker);
  tempMarker[num] = marker;
  tempScope[num] = scope;
  console.log(tempMarker[num]); //OBJ반환


}

function addOption(optionText){
  var markList = document.getElementById("markerList");
  var markOption = document.createElement("option");

  markOption.text = optionText;
  markOption.value = num; //checkedOption으로 접근
  markList.add(markOption,markList[num]);
  console.log(markList[num]);
  num += 1;
}


	function hideGroup() {
    var groupName = document.getElementById('markerGroup').value;
		groupMarker.hideGroup(groupName);
    for(var i=0;i<tempScope.length;i++){
      if(tempScope[i].groupName == groupName){
        tempScope[i].circle.setFillOpacity(0);
        tempScope[i].circle.setOpacity(0);

      }else{
        console.log(groupName +"없는뎅??" + i)
      }
    }
	}

	function showGroup() {
    var groupName = document.getElementById('markerGroup').value;
		groupMarker.showGroup(groupName);
    for(var i=0;i<tempScope.length;i++){
      if(tempScope[i].groupName == groupName){
        tempScope[i].circle.setFillOpacity(0.2);
        tempScope[i].circle.setOpacity(0.6);
      }
    }
	}

  function removeGroup() {
    var groupName = document.getElementById('markerGroup').value;
  	groupMarker.removeGroup(groupName);
    for(var i=0;i<tempScope.length;i++){
      if(tempScope[i].groupName == groupName){
        map.vectorLayer.removeFeatures(tempScope[i].circle);
        markerList.remove(i);
      }
    }
    groupMarker = new vworld.GroupMarker(groupName);

  }


function mhide() {
  var checkedOption = document.getElementById("markerList").value;
  tempMarker[checkedOption].hide();
  tempScope[checkedOption].circle.setFillOpacity(0);
  tempScope[checkedOption].circle.setOpacity(0);
}

function mshow() {
  var checkedOption = document.getElementById("markerList").value;
  tempMarker[checkedOption].show();
  tempScope[checkedOption].circle.setFillOpacity(0.2);
  tempScope[checkedOption].circle.setOpacity(0.6);
}

function mdelete() { ////////만들어야됨!!!!!!!!!!!!!!!!!
  var checkedOption = document.getElementById("markerList").value
  tempMarker[checkedOption].remove();
  tempMarker.splice(checkedOption, 1);
  map.vectorLayer.removeFeatures(tempScope[checkedOption].circle);
  markerList.remove(checkedOption);

}

function resetAll() {
  console.log(tempMarker);


  map.initAll();
  num = 0;
  markerList.options.length = 0;
}

function saveImg(){
    map.getPrintMap();
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
    // beforeSend: function() {
    //   $('#loading').text("로딩중....");
    // },

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
      // $('#loading').text(geoResult);
      var msg = num + 1 + "번 마커 <br>" + geoResult +"<br>x: " + x + "<br>y: " + y;
      var group = document.getElementById("markerGroup").value;
      var optionText = num + 1 +"번 마커:[" + group + "] "+ geoResult;
      addMarker(group, x, y, msg, null);
      addOption(optionText);

    },
    // beforeSend: function() {},
    error: function(xhr, stat, err) {}

  });
}

///////////////////////////좌표환산/////////////////////////
//ol.proj.transform([126.9380517322744,37.16792263658907], 'EPSG:4326', 'EPSG:900913')
////////////////////////////////////////////////////////////


let SOPPlugin
let map = null;
vworld.showMode = false;
let mControl; //마커이벤트변수
let tempMarker = new Array(); //임시마커
let tempScope = new Array();
let groupMarker;
let groupName;
const modal = document.getElementById('groupModal');


window.onload = function() {

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


function slideLeft() {
  let btn = document.getElementById('mapCheckbox');
  btn.classList.toggle("slideleft");

}

function slideUp() {
  let btn = document.getElementById('markerMaker');
  btn.classList.toggle("slideup");
  // console.log('upup')
}

function openPopup() {
  modal.style.display = "block";
}

function closePopup() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {

  }
}

/**
 * 마커 찍기
 */

//
// function mapLayeringEvent(){
//   let mode0 = document.getElementById("mode0");
//   mode0.addEventListener('click',vworld.setMode(0),false);
//   let mode1= document.getElementById("mode1");
//   mode1.addEventListener('click',vworld.setMode(1),false);
//   let dosi =document.getElementById("do");
//   dosi.addEventListener('click',addThemeLayer('광역시도','LT_C_ADSIDO'),false);
//   let si = document.getElementById("si");
//   si.addEventListener('click',addThemeLayer('시군구','LT_C_ADSIGG'),false);
//   let eub = document.getElementById("eub");
//   eub.addEventListener('click',addThemeLayer('읍면동','LT_C_ADEMD'),false);
//   let jijuk = document.getElementById("jijuk");
//   jijuk.addEventListener('click',addThemeLayer('지적도','LP_PA_CBND_BUBUN,LP_PA_CBND_BONBUN'),false);
// };

function addMarkingEvent() {
  let pointOptions = {
    persist: true
  }; //포인트옵션

  if (mControl == null) { //마커컨트롤이 정의 되어 있지 않으면    
    mControl = new OpenLayers.Control.Measure(OpenLayers.Handler.Point, {
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
  let temp = event.geometry; //마커 클릭이벤트시 나오는 좌표
  let pos = new OpenLayers.LonLat(temp.x, temp.y); //좌표값 셋팅

  if(groupMarker == null){
    groupMarker = new vworld.GroupMarker('lora');
    groupMarker = new vworld.GroupMarker('wifi');
    groupMarker = new vworld.GroupMarker('ble');
    console.log('added groupMarker');
  }
  geocoder_reverse(pos.lon, pos.lat);
  //말풍선
}

let myradius = 1000; //초기값
let num = 0;
let groupNum = 0;
let add = "";


function setRadius() {

  let rad = document.querySelector('input[name="rad"]:checked').value;
  if (rad != "") myradius = rad;
  // console.log("myradius is chaged to" + rad);
}

function colorChange(group) {
  let style_orange = {
    strokeColor: "#ff6300",
    strokeOpacity: 0.6,
    strokeWidth: 1,
    fillColor: "#ff6300",
    fillOpacity: 0.2
  };

  let style_blue = {
    strokeColor: "#0021ff",
    strokeOpacity: 0.6,
    strokeWidth: 1,
    fillColor: "#0021ff",
    fillOpacity: 0.2
  }
  let style_violet = {
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
  let scope = {
    circle: new vworld.Circle({
      x: lon,
      y: lat
    }, myradius, colorChange(group)),
    groupName: group

  };

  let marker = groupMarker.addMarker(group, lon, lat, message, "");
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

function addOption(optionText) {
  let markList = document.getElementById("markerList");
  let markOption = document.createElement("option");

  markOption.text = optionText;
  markOption.value = num; //checkedOption으로 접근
  markList.add(markOption, markList[num]);
  console.log(markList[num]);
  num += 1;
}


function addGroup(){
  let mGroup = document.getElementById("mGroup");
  let mMGroup = document.getElementById("mMGroup");
  let markOption = document.createElement("option");
  let groupName = document.getElementById("makeGroupName").value;

  markOption.text = groupName;
  markOption.value = groupNum;
  mGroup.add(markOption,mGroup[groupNum]);
  mMGroup.add(markOption,mMGroup[groupNum]);
  groupNum += 1;
}

function hideGroup() {
  let groupName = document.getElementById('mMarkerGroup').value;
  groupMarker.hideGroup(groupName);
  for (let i = 0; i < tempScope.length; i++) {
    if (tempScope[i].groupName == groupName) {
      tempScope[i].circle.setFillOpacity(0);
      tempScope[i].circle.setOpacity(0);

    } else {
      console.log(groupName + "없는뎅??" + i)
    }
  }
}

function showGroup() {
  let groupName = document.getElementById('mMarkerGroup').value;
  groupMarker.showGroup(groupName);
  for (let i = 0; i < tempScope.length; i++) {
    if (tempScope[i].groupName == groupName) {
      tempScope[i].circle.setFillOpacity(0.2);
      tempScope[i].circle.setOpacity(0.6);
    }
  }
}

function removeGroup() {
  let groupName = document.getElementById('mMarkerGroup').value;
  groupMarker.removeGroup(groupName);
  for (let i = 0; i < tempScope.length; i++) {
    if (tempScope[i].groupName == groupName) {
      map.vectorLayer.removeFeatures(tempScope[i].circle);
      markerList.remove(i);
    }
  }
  groupMarker = new vworld.GroupMarker(groupName);
  console.log("remake "+groupName);

}


function mhide() {
  let checkedOption = document.getElementById("markerList").value;
  tempMarker[checkedOption].hide();
  tempScope[checkedOption].circle.setFillOpacity(0);
  tempScope[checkedOption].circle.setOpacity(0);
}

function mshow() {
  let checkedOption = document.getElementById("markerList").value;
  tempMarker[checkedOption].show();
  tempScope[checkedOption].circle.setFillOpacity(0.2);
  tempScope[checkedOption].circle.setOpacity(0.6);
}

function mdelete() { ////////만들어야됨!!!!!!!!!!!!!!!!!
  let checkedOption = document.getElementById("markerList").value
  tempMarker.splice(checkedOption, 1);
  groupMarker.removeMarker(checkedOption); //이거 왜 안되는지 알 수가 없음
  map.vectorLayer.removeFeatures(tempScope[checkedOption].circle);
  // markerList.option[checkedOption] = null;
  markerList.remove(checkedOption);

}

function resetAll() {
  console.log(tempMarker);

  map.initAll();
  num = 0;
  markerList.options.length = 0;
}

function saveImg() {
  map.getPrintMap();
}

////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/*주소 -> 좌표*/
let geocoder = function(name) {
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
      // let point = ol.proj.transform([ data.response.result.point.x*1, data.response.result.point.y*1],'EPSG:4326', "EPSG:900913");
      // dataAjax(point[0],point[1]);
    },
    // beforeSend: function() {
    //   $('#loading').text("로딩중....");
    // },

    error: function(xhr, stat, err) {}
  });
}

/*좌표 -> 주소*/
let geocoder_reverse = function(x, y) {
  $.ajax({
    type: "get",
    url: "http://api.vworld.kr/req/address?service=address&version=2.0&request=getaddress&format=json&type=parcel&crs=epsg:900913",
    data: {
      apiKey: $('[name=apiKey]').val(),
      point: x + "," + y
    },
    dataType: 'jsonp',
    success: function(data) {
      let geoResult = "";
      for (i in data.response.result) {
        geoResult += data.response.result[i].text;
      }
      // $('#loading').text(geoResult);
      let msg = num + 1 + "번 마커 <br>" + geoResult + "<br>x: " + x + "<br>y: " + y;
      let group = document.getElementById("markerGroup").value;
      let optionText = num + 1 + "번 마커:[" + group + "] " + geoResult;
      addMarker(group, x, y, msg, null);
      addOption(optionText);

    },
    // beforeSend: function() {},
    error: function(xhr, stat, err) {}

  });
}

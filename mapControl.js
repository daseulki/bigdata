///////////////////////////////////MAP TEST (only frontend)
///////////////////////////////////////////////////////////


/////////////////////////////////////////Declare Variable
//////////////////////////////////////////////////////////

let SOPPlugin
let map = null;
vworld.showMode = false;
let mControl; //마커이벤트변수
let tempMarker ; //임시마커
let tempScope = [];
let groupMarker;
let groupName;
const modal = document.getElementById('groupModal');

let myradius = 1000; //초기값
let num = 0;
let groupNum = 0;
let add = "";

/////////////////////////////////////////////////화면 그리기
///////////////////////////////////////////////////////////

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

////////////////////////////////////////////css 조절
////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////마커 이벤트
/////////////////////////////////////////////////////////////////////

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


function mClick(event) {
  map.init(); //나의 맵 초기화
  let temp = event.geometry; //마커 클릭이벤트시 나오는 좌표
  let pos = new OpenLayers.LonLat(temp.x, temp.y); //좌표값 셋팅

  if (groupMarker == null) {
    groupMarker = new vworld.GroupMarker('lora');
    groupMarker = new vworld.GroupMarker('wifi');
    groupMarker = new vworld.GroupMarker('ble');
    console.log('added groupMarker' + groupMarker);
  }
  geocoder_reverse(pos.lon, pos.lat);
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

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
  let marker = groupMarker.addMarker(group, lon, lat, message, "");

  // 마커 아이콘 이미지 파일명 설정합니다.
  setRadius();
  console.log("set Radius x:" + lon + ", y: " + lat);
  let scope = {
    circle: new vworld.Circle({
      x: lon,
      y: lat
    }, myradius, colorChange(group)),
    groupName: group,
    index: num
  };
  //scope.circle.marker = marker;
  console.log(scope);

  if (typeof imgurl == 'string') {
    marker.setIconImage(imgurl);
  }

  // 마커의 z-Index 설정
  marker.setZindex(3);
  //marker.id = num;
  // marker.desc = group;
  // marker.setDragMode(true);
  console.log(marker);
  map.addMarker(marker);
  tempMarker = marker;
  console.log("just insert marker to tempMarker Array");

  tempScope[num] = scope;
  console.log("방금 생성한 마커 오브젝트 id: " + tempMarker.id); //OBJ반환
}

function addOption(optionText) {
  let markList = document.getElementById("markerList");
  let markOption = document.createElement("option");

  markOption.text = optionText;
  markOption.value = num; //checkedOption으로 접근
  markList.add(markOption, markList[num]);
  console.log("addOption: " + optionText);
  num += 1;
}

function confirmGroup() {

  let mGroup = document.getElementById("mGroup");
  let mMGroup = document.getElementById("mMGroup");
  let markOption;

  if (mGroup.options.length == 0) {
    for (let i = 0; i < mMGroup.options.length; i++) {
      markOption = document.createElement("option");
      console.log("option: " + mMGroup.options[i].value);
      markOption.text = mMGroup.options[i].text;
      markOption.value = mMGroup.options[i].value;
      mGroup.add(markOption, mGroup[i]);
    }
  } else {
    for (let i = mGroup.length; i < mMGroup.options.length; i++) {
      markOption = document.createElement("option");
      console.log("option: " + mMGroup.options[i].value);
      markOption.text = mMGroup.options[i].text;
      markOption.value = mMGroup.options[i].value;
      mGroup.add(markOption, mGroup[i]);
    }
  }
}

///////////////////////////////////////////////////////마커 수정..
//////////////////////////////////////////////////////////////////

function addGroup() { //그룹 대체 왜안되냐.. 캐싱 에러 대체 뭐야..

  let mMGroup = document.getElementById("mMGroup");
  let markOption = document.createElement("option");
  let groupName = document.getElementById("makeGroupName").value;

  markOption.text = groupName;
  markOption.value = groupNum;
  mMGroup.add(markOption, mMGroup[groupNum]);
  groupNum += 1;
  console.log("group id: " + groupNum)
}

function hideGroup() {
  let groupName = document.getElementById('mMarkerGroup').value;
  groupMarker.hideGroup(groupName);
  for (let i = 0; i < tempScope.length; i++) {
    if (tempScope[i].groupName == groupName) {
      tempScope[i].circle.setFillOpacity(0);
      tempScope[i].circle.setOpacity(0);
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
      for (let j = 0; j < markerList.options.length; j++) {
        if (markerList.options[j].value == i) {
          markerList.options[j] = null;
          console.log(i + "번에 있는 " + markerList.options[i] + " 지웠다.")
        }
      }
    }
  }
  groupMarker = new vworld.GroupMarker(groupName);
  console.log("remake " + groupName + ", next num is " + markerList.options.length);
}


function mhide() {
  let checkedOption = $("#markerList option").index($("#markerList option:selected"));
  let marker =  map.userMarkers.markers[checkedOption];
  let optionVal = document.getElementById("markerList").value;
  marker.hide();
  tempScope[optionVal].circle.setFillOpacity(0);
  tempScope[optionVal].circle.setOpacity(0);
}

function mshow() {
  let checkedOption = $("#markerList option").index($("#markerList option:selected"));
  let marker =  map.userMarkers.markers[checkedOption];
  let optionVal = document.getElementById("markerList").value;
  marker.show();
  tempScope[optionVal].circle.setFillOpacity(0.2);
  tempScope[optionVal].circle.setOpacity(0.6);
}

function mdelete() { ////////고쳐야됨!!!!!!!!!!!!!!!!!
  let checkedOption = $("#markerList option").index($("#markerList option:selected"));
  let optionVal = document.getElementById("markerList").value;
  // let group = document.getElementById("markerList").options[checkedOption].innerHTML.slice(8,12);
  let marker =  map.userMarkers.markers[checkedOption];
  // map.getMarker(checkedOption);

  // map.getLayerByName(group).markers[checkedOption].hide();
  // map.getLayerByName(group).markers.splice(checkedOption,1);

  //tempMarker[checkedOption].erase();

  //console.log(tempMarker[checkedOption] + "에서 splice 실행");
  //tempMarker.splice(checkedOption, 1);

  map.vectorLayer.removeFeatures(tempScope[optionVal].circle);
  // console.log("원지우기함")
  groupMarker.removeMarker(marker.id);
  map.userMarkers.removeMarker(marker);
  // markerList.option[checkedOption] = null;
  markerList.remove(checkedOption);
  // console.log("옵션에서 삭제완료")

}

function resetAll() {
  map.initAll();
  markerList.options.length = 0;
  groupMarker.removeGroup('lora');
  groupMarker.removeGroup('wifi');
  groupMarker.removeGroup('ble');
  groupMarker = null;
  tempMarker = null;
  tempScope = new Array();
  num = 0;
}

function saveImg() {
  map.getPrintMap();
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
      let optionText = num + 1 + "번 마커: [" + group + "] " + geoResult;
      addMarker(group, x, y, msg, null);
      console.log("addMarker 실행완료");
      addOption(optionText);
      console.log("addOption 완료...");

    },
    // beforeSend: function() {},
    error: function(xhr, stat, err) {}

  });
}
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

///////////////////////////좌표환산/////////////////////////
//ol.proj.transform([126.9380517322744,37.16792263658907], 'EPSG:4326', 'EPSG:900913')
////////////////////////////////////////////////////////////

// function(markerId){
//   var groupName = document.getElementById("markerList").options[checkedOption].innerHTML.slice(8,12);
//   for(var i=0;i<map.getLayerByName(groupName).markers.length;i++){
//     if(markerId==map.getLayerByName(groupName).markers[i].id){
//       if(map.getLayerByName(groupName).markers[i].popup!=null){
//         map.getLayerByName(groupName).markers[i].popup.hide();
//       }
//       map.getLayerByName(groupName).markers[i].hide();
//       map.getLayerByName(groupName).markers.splice(i,1);
//     }
//   }
// }

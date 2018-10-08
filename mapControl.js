///////////////////////////////////MAP TEST (only frontend)
///////////////////////////////////////////////////////////

// Array.from = function (s, t) { return Array.prototype.map.call(s, t || function (i) { return i; }); };


/////////////////////////////////////////Declare Variable
//////////////////////////////////////////////////////////

let SOPPlugin
let map = null;
vworld.showMode = false;
let mControl; //마커이벤트변수
let tempMarker ; //임시마커
let tempScope = new Array();
let groupMarker;
let groupName;
let userGroup;
const modal = document.getElementById('groupModal');
let myradius = 1000; //초기값
let num = 0;
let groupNum = 0;
let add = "";

let textFile = null;

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

let setModeCallback = function() {
  vworld.setModeCallback(modecallback);
}

// function fnChangeHybridVisibility() {
//   map.vworldHybrid.setVisibility(!map.vworldHybrid.getVisibility());
// }

let addThemeLayer = function(title, layer) {
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

let setTestProxy =  function() {
  alert(OpenLayers.ProxyHost);
}

////////////////////////////////////////////css 조절
////////////////////////////////////////////////////

let slideLeft = function() {
  let btn = document.getElementById('mapCheckbox');
  btn.classList.toggle("slideleft");

}

let slideUp = function() {
  let btn = document.getElementById('markerMaker');
  btn.classList.toggle("slideup");
  // console.log('upup')
}

let openPopup = function() {
  modal.style.display = "block";
}

let closePopup = function() {
  modal.style.display = "none";
}

////////////////////////////////////////////////////////////마커 이벤트
/////////////////////////////////////////////////////////////////////

let addMarkingEvent = function() {
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


let mClick = function(event) {
  map.init(); //나의 맵 초기화

  let checkedOption = $("#mGroup option").index($("#mGroup option:selected"));
  userGroup = mMGroup.options[checkedOption];

  if (userGroup == null){
    alert("사용자 그룹이 지정되지 않았습니다. 그룹을 추가해주세요.");

  }else{
    let temp = event.geometry; //마커 클릭이벤트시 나오는 좌표
    let pos = new OpenLayers.LonLat(temp.x, temp.y); //좌표값 셋팅

    if (groupMarker == null) {
      groupMarker = new vworld.GroupMarker('lora');
      groupMarker = new vworld.GroupMarker('wifi');
      groupMarker = new vworld.GroupMarker('ble');
      // console.log(`added groupMarker: ${groupMarker}`);
    }
    geocoder_reverse(pos.lon, pos.lat);
  }
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

let setRadius = function() {
  let rad = document.querySelector('input[name="rad"]:checked').value;
  if (rad != "") myradius = rad;
  // console.log("myradius is chaged to" + rad);
}

let colorChange = function(group) {
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

let addMarker = function(group, lon, lat, message, imgurl) {
  let marker = groupMarker.addMarker(group, lon, lat, message, "");

  // 마커 아이콘 이미지 파일명 설정합니다.
  setRadius();
  console.log("set Radius x:" + lon + ", y: " + lat);
  let scope = {
    circle: new vworld.Circle({
      x: lon,
      y: lat
    }, myradius, colorChange(group)),
    groupName: group
  };
  //scope.circle.marker = marker;
  console.log(scope);

  if (typeof imgurl == 'string') {
    marker.setIconImage(imgurl);
  }

  // 마커의 z-Index 설정
  marker.setZindex(3);
  //marker.id = num;

  marker.desc = userGroup.innerHTML;

    // marker.setDragMode(true);
  console.log(marker);
  map.addMarker(marker);
  tempMarker = marker;
  console.log("just insert marker to tempMarker Array");

  tempScope[num] = scope;
  console.log("방금 생성한 마커 오브젝트 id: " + tempMarker.id); //OBJ반환

}

let addOption = function(optionText) {
  let markList = document.getElementById("markerList");
  let markOption = document.createElement("option");

  markOption.text = optionText;
  markOption.value = num; //checkedOption으로 접근
  markList.add(markOption, markList[num]);
  console.log("addOption: " + optionText);
  num += 1;
}

let confirmGroup = function() {

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

let addGroup = function() {

  let mMGroup = document.getElementById("mMGroup");
  let markOption = document.createElement("option");
  let groupName = document.getElementById("makeGroupName").value;

  markOption.text = groupName;
  markOption.value = groupNum;
  mMGroup.add(markOption, mMGroup[groupNum]);
  groupNum += 1;
  console.log("group id: " + groupNum);
}

let delGroup = function(){
  let checkedOption = $("#mMGroup option").index($("#mMGroup option:selected"));
  mMGroup.options[checkedOption] = null;
  mGroup.options[checkedOption] = null;

}

let hideGroup = function() {
  let groupName = document.getElementById('mMarkerGroup').value;
  groupMarker.hideGroup(groupName);
  for (let i = 0; i < tempScope.length; i++) {
    if (tempScope[i].groupName == groupName) {
      tempScope[i].circle.setFillOpacity(0);
      tempScope[i].circle.setOpacity(0);
    }
  }
}

let showGroup = function() {
  let groupName = document.getElementById('mMarkerGroup').value;
  groupMarker.showGroup(groupName);
  for (let i = 0; i < tempScope.length; i++) {
    if (tempScope[i].groupName == groupName) {
      tempScope[i].circle.setFillOpacity(0.2);
      tempScope[i].circle.setOpacity(0.6);
    }
  }
}

let removeGroup = function() {
  let groupName = document.getElementById('mMarkerGroup').value;
  let marker = map.userMarkers.markers;

  // map.userMarkers.markers.splice(i,1);

  // function removeChars(element,index,array){
  //     return (element.groupName !== groupName);
  // }
  //

  //////////////////////////// ES6.. 익스에서 안되네..
  // for (const curScope of tempScope){
  //   if(curScope.groupName === groupName){
  //     map.vectorLayer.removeFeatures(curScope.circle);
  //     curScope.groupName=" ";
  //     console.log(curScope);
  //   }
  //   for(const curList of markerList.options){
  //     if(curList.value === tempScope.indexOf(curScope)){
  //       curList = null;
  //     }
  //   }
  // }
  // for(const curMarker of marker){
  //   if(curMarker.id.slice(0,4) === groupName ){
  //     groupMarker.removeMarker(curMarker.id);
  //     map.userMarkers.removeMarker(curMarker);
  //   }
  // }

  //////////////////////////////ES5
  for (let i = 0; i < tempScope.length; i++) {
    if (tempScope[i].groupName == groupName) {
      map.vectorLayer.removeFeatures(tempScope[i].circle);
      tempScope[i].groupName = " ";

      for (let j = 0; j < markerList.options.length; j++) {
        if (markerList.options[j].value == i) {
          markerList.options[j] = null;
        }
      }
    }
  }

  for (let i = 0; i < marker.length; i++){
    if (marker[i].id.slice(0,4) == groupName){
      groupMarker.removeMarker(marker[i].id);
      map.userMarkers.removeMarker(marker[i]);
      console.log(marker[i]);
    }
  }

  groupMarker.removeGroup(groupName);
  //tempScope = tempScope.filter(removeChars);
  groupMarker = new vworld.GroupMarker(groupName);
  // console.log("remake " + groupName + ", next num is " + markerList.options.length);
}


 let mhide = function() {
  let checkedOption = $("#markerList option").index($("#markerList option:selected"));
  let marker =  map.userMarkers.markers[checkedOption];
  let optionVal = document.getElementById("markerList").value;
  marker.hide();
  tempScope[optionVal].circle.setFillOpacity(0);
  tempScope[optionVal].circle.setOpacity(0);
}

let mshow = function() {
  let checkedOption = $("#markerList option").index($("#markerList option:selected"));
  let marker =  map.userMarkers.markers[checkedOption];
  let optionVal = document.getElementById("markerList").value;
  marker.show();
  tempScope[optionVal].circle.setFillOpacity(0.2);
  tempScope[optionVal].circle.setOpacity(0.6);
}

let mdelete = function() { ////////고쳐야됨!!!!!!!!!!!!!!!!!
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

let resetAll = function() {
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

let saveImg = function() {
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

///////////////////////////////////////////////////검색기능
/////////////////////////////////////////////////////////////

let features = new Array();
let styleCache = new Array();


let search = function(){
    $.ajax({
        type: "get",
        url: "http://map.vworld.kr/search.do",
        data : $('#searchForm').serialize(),
        dataType: 'jsonp',
        async: false,
        success: function(data) {
            for(let o in data.LIST){
                if(o==0){
                    move(data.LIST[o].xpos*1,data.LIST[o].ypos*1);
                }

                features[o] = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([ data.LIST[o].xpos*1,data.LIST[o].ypos*1],'EPSG:4326', "EPSG:900913")),
                    juso: data.LIST[o].juso,
                    RD_NM: data.LIST[o].RD_NM,
                    ZIP_CL: data.LIST[o].ZIP_CL,
                    nameDp: data.LIST[o].nameDp,
                    nameFull: data.LIST[o].nameFull,
                    njuso: data.LIST[o].njuso
                });
                features[o].set("codeName",data.LIST[o].codeName);
            }

            let vectorSource = new ol.source.Vector({
                  features: features
            });

            let clusterSource = new ol.source.Cluster({
                distance: parseInt(10, 10),
                source: vectorSource
            });

            let clusters = new ol.layer.Vector({
                source: clusterSource,
                style: function(feature) {
                    let size = feature.get('features').length;
                    let style = styleCache[size];
                    if (!style) {
                        style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            stroke: new ol.style.Stroke({
                              color: '#fff'
                            }),
                            fill: new ol.style.Fill({
                              color: '#3399CC'
                            })
                        }),
                        text: new ol.style.Text({
                          text: size.toString(),
                          fill: new ol.style.Fill({
                            color: '#fff'
                          })
                        })
                      });
                      styleCache[size] = style;
                    }
                    return style;
                }
            });

            /*
                기존검색결과를 제거하기 위해 키 값 생성
            */
            clusters.set("cluster","search_cluster")

            map.getLayersBy().forEach(function(layer){
                if(layer.get("cluster")=="search_cluster"){
                    map.removeLayer(layer);
                }
            });

            map.addLayer(clusters);
        },
        error: function(xhr, stat, err) {}
    });


}

let move = function(x,y){//127.10153, 37.402566
    map.setCenterAndZoom(x, y, 14);
    // map.getView().setCenter(ol.proj.transform([ x, y ],'EPSG:4326', "EPSG:900913")); // 지도 이동
    // map.getView().setZoom(12);
}


///////////////////////////////////////////////////////////파일생성
///////////////////////////////////////////////////////////////////

let makeTextFile = function (text){
  let data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
  textFile = window.URL.createObjectURL(data);

     // returns a URL you can use as a href
    return textFile;
  };

  let todayFile = 0;

  let saveTextAsFile = function(){

    let textToWrite = map.userMarkers.marker;
    let textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    let today =new Date().getYear() +""+ new Date().getMonth() +""+ new Date().getDay();
    let fileNameToSaveAs = marker+today+"_"+todayFile;
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
    todayFile +=1;
}

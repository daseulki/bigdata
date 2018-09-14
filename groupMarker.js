

function GroupMarker(groupName){

}

function addMarker(groupName, lon, lat, title, message, imgurl, proj) {
  setradius();
  var scope = new vworld.Circle({
    x: lon,
    y: lat
  }, myradius, colorChange(group));

  geocoder_reverse(lon, lat);

  var msg = num + 1 + "번 마커 <br>" + add + "<br>x: " + lon + "<br>y: " + lat;

  var marker = new vworld.Marker(lon, lat, msg, "");
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

  console.log(tempMarker); //OBJ반환
  var markList = document.getElementById("markerList");
  var markOption = document.createElement("option");
  markOption.text = num + 1 + "번 마커";
  markOption.value = add;
  markList.options.add(markOption);
  num += 1;

}


function moveGroup(lonlat, groupName){

}

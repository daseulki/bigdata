
  var SOPPlugin
  window.onload = function() {
    setTimeout(function() {
      sop.earth.createInstance('testmaparea', initCall, failureCall);
    }, 1);
  }

  function initCall(obj) {
    SOPPlugin = obj
    SOPPlugin.getViewCamera().moveLonLat(127.0285, 37.4980);
    SOPPlugin.getViewCamera().setAltitude(10000);

  }

  function failureCall(msg) {
    alert(msg);
  }

  function jsSample() {
    if (SOPPlugin != null) {
      SOPPlugin.getViewCamera().moveLonLat(127.0405, 37.5016);
      SOPPlugin.getViewCamera().setAltitude(1000);
    }
  }

  function jsSample2() {
    if (SOPPlugin != null) {
      var SOPCamera = SOPPlugin.getViewCamera();
      SOPCamera.setAltitude(5000);
    }
  }

  function jsSample3() {
    if (SOPPlugin != null) {
      var SOPCamera = SOPPlugin.getViewCamera();
      SOPCamera.setTilt(45);
    }
  }

  function jsSample4() {
    if (SOPPlugin != null) {
      var SOPCamera = SOPPlugin.getViewCamera();
      SOPCamera.setDirect(-5);
    }
  }

  function jsSample7() {

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




  //
  // function jsSample1ex(name, visibility) {
  //   if (SOPPlugin != null) {
  //     let str = "";
  //     let SOPLayerList = SOPPlugin.getLayerList();
  //     let vis = SOPLayerList.getVisible(name);
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
  //     let SOPCamera = SOPPlugin.getViewCamera();
  //     SOPCamera.setDirect(-5);
  //   }
  // }
  //
  // function makeSymbol() {
  //
  //   if (SOPPlugin != null) {
  //     SOPPlugin.getViewCamera().moveLonLat(127.0405, 37.5016); //카메라가 이동할 경도와 위도
  //     SOPPlugin.getViewCamera().setAltitude(500); //카메라가 이동할 고도
  //     let vec3 = SOPPlugin.createVec3();
  //     poi = SOPPlugin.createPoint('999');
  //     vec3.Longitude = 127.0405; //심볼이 생설될 위치의 경도
  //     vec3.Latitude = 37.5016; //심볼이 생성될 위치의 위도
  //     vec3.Altitude = 0; //심볼이 생성될 위치의 고도
  //     poi.Set(vec3);
  //     let sym = poi.getSymbol();
  //     let icon = sym.getIcon();
  //     icon.setNormalIcon('http://www.vworld.kr/images/op02/map_point.png'); //심볼 아이콘 주소
  //     sym.setIcon(icon);
  //     poi.setName("테스트"); //심볼 아이콘 이름
  //     poi.setSymbol(sym);
  //     SOPPlugin.getView().addChild(poi, 8);
  //   }
  // }
  //
  // function createPlacemark() {
  //   let va, vNum, pt;
  //   vNum = SOPPlugin.getView().getInputPointCount();
  //   if (vNum < 1) return;
  //   va = SOPPlugin.getView().getInputPointList();
  //   pt = va.get(0);
  //   let poi, symbolizdPoi;
  //   let objId = "1";
  //   poi = SOPPlugin.createPoint(objId);
  //   poi.Set(pt)
  //   let sym = poi.getSymbol();
  //   let icon = sym.getIcon();
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
  //   let type = "";
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
  //   let va, vNum;
  //   vNum = SOPPlugin.getView().getInputPointCount();
  //   if (vNum < 3) return;
  //   va = SOPPlugin.getView().getInputPointList();
  //   let objId = "1";
  //   rect = SOPPlugin.createPolygon(objId);
  //   rect.setCoordinates(va);
  //   let polyStyle;
  //   polyStyle = rect.getStyle();
  //   let sopColor;
  //   let sopColor = polyStyle.getOutlineColor();
  //   sopColor.setARGB(255, 232, 83, 228); //폴리곤의 색깔
  //   polyStyle.setOutLineColor(sopColor);
  //   let sopFillColor = polyStyle.getFillColor();
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

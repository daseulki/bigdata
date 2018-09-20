var map = null;
	vworld.init("mainMap", "base", function() {
		map = this.vmap;
		map.setCenterAndZoom(14243425.793355, 4342305.8698004, 8);

	});

	window.onload = function() {
		groupMarker = new vworld.GroupMarker('lora');
	}

	var	groupMarker;
	var groupName;
	var title;
	function createGroup(groupName) {
		groupMarker = new vworld.GroupMarker(groupName);
	}

	function getGroupNameList() {
		var list;
		var str = "";

		if (groupMarker != undefined) {
			list = groupMarker.getGroupNameList(); //return type : array
			if (list.length == 0) {
				str = '생성된 그룹이 없습니다.';
			} else {
				for ( var i = 0; i < list.length; i++) {
					str += list[i] + "  ";
				}
			}
			alert(str);
		} else {
			alert('생성된 그룹이 없습니다.');
		}
	}


	//화면클릭 이벤트 등록 및 마커찍기

	var markerControl;
	var markerControl2;
	function addGroupMarker(groupName, title) {

		if (groupMarker != undefined) {
			if (groupMarker.checkHistory(groupName)) {
				this.groupName = groupName;
				this.title = title;
				var pointOptions = {
					persist : true
				}
				if (markerControl == null) {
					markerControl = new OpenLayers.Control.Measure(
							OpenLayers.Handler.Point, {
								handlerOptions : pointOptions
							});
					markerControl.events.on({
						"measure" : mapclick
					});
					map.addControl(markerControl);
				}
				map.init();
				markerControl.activate();
			} else {
				alert(groupName + '으로 생성된 그룹이 없습니다.');
			}
		} else {
			alert('생성된 그룹이 없습니다.');
		}
	}

	//화면클릭 이벤트 해제
	function removeMarkingEvent() {
		map.events.unregister('click', this, mapclick);
	}
	//클릭이벤트 받아 마커찍기 호출
	function mapclick(event) {
		map.init();
		var temp = event.geometry;
		var pos = new OpenLayers.LonLat(temp.x, temp.y);

		var imgurl = 'http://map.vworld.kr/images/ol3/marker_blue.png';
		//			alert(imgurl);
		var desc = '그룹마커 테스트';
		addMarker(groupName, pos.lon, pos.lat, title, desc, imgurl);

	}
	//좌표받아 마커찍기
	function addMarker(groupName, lon, lat, title, desc, imgurl) {
		if (groupMarker != undefined) {
			var marker = groupMarker.addMarker(groupName, lon, lat, title,
					desc, imgurl);
			if (marker != undefined) {
				if (typeof imgurl == 'string') {
					marker.setIconImage(marker.icon.url);
				}
				map.addMarker(marker);
				testMarker = marker;
				marker.events.register('mouseover', marker, function(evt) {
					document.getElementById("id").value = marker.id;
				});
			}
		} else {
			alert('생성된 그룹이 없습니다.');
		}

	}

	function getGroup(groupName) {
		var list;
		var markerSize;
		var str = '';
		if (groupMarker != undefined) {
			if (groupMarker.checkHistory(groupName)) {
				list = groupMarker.getGroup(groupName); //return type : array
				if (list.length == 0) {
					str = '등록된 마커가 없습니다.';
				} else {
					for ( var i = 0; i < list.length; i++) {
						str += list[i].id + "  ";
					}
				}
				alert(groupName + '에 등록된 마커의 갯수 : ' + list.length
						+ '\n 등록된 마커 ID : ' + str);
			} else {
				alert(groupName + '으로 생성된 그룹이 없습니다.');
			}
		} else {
			alert('생성된 그룹이 없습니다.');
		}
	}

	function hideGroup(groupName) {
		groupMarker.hideGroup(groupName);
	}

	function showGroup(groupName) {
		groupMarker.showGroup(groupName);
	}

	function getGroupList() {
		var str = '';
		var list = groupMarker.getGroupList();
		for ( var i = 0; i < list.length; i++) {
			str += list[i].id + "  ";
		}

		alert('전체 마커 갯수 : ' + list.length + '\n 등록된 마커 ID : ' + str);
	}

	function removeGroup(groupName) {
		groupMarker.removeGroup(groupName);
	}

	function removeMarker() {
		var id = document.getElementById("id").value;
		groupMarker.removeMarker(id);
	}

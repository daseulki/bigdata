$(function(){

    $.ajax({
        type: "get",
        url: "http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admCodeList.json",
        data : {authkey : $('#sido_key').val()},
        async: false,
        dataType: 'json',
        success: function(data) {
            var html = "<option>선택</option>";

            for(var i=0;i<data.admVOList.admVOList.length;i++){
                html +="<option value='"+data.admVOList.admVOList[i].admCode+"'>"+data.admVOList.admVOList[i].lowestAdmCodeNm+"</option>"
            }

            $('#sido_code').html(html);

        },
        error: function(xhr, stat, err) {}
    });


    $(document).on("change","#sido_code",function(){
        var thisVal = $(this).val();

        $.ajax({
            type: "get",
            url: "http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admSiList.json",
            data : {admCode : thisVal, authkey : $('#sigoon_key').val()},
            async: false,
            dataType: 'json',
            success: function(data) {
                var html = "<option>선택</option>";

                for(var i=0;i<data.admVOList.admVOList.length;i++){
                    html +="<option value='"+data.admVOList.admVOList[i].admCode+"'>"+data.admVOList.admVOList[i].lowestAdmCodeNm+"</option>"
                }

                $('#sigoon_code').html(html);

            },
            error: function(xhr, stat, err) {}
        });
    });

    $(document).on("change","#sigoon_code",function(){
        var thisVal = $(this).val();

        $.ajax({
            type: "get",
            url: "http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admDongList.json",
            data : {admCode : thisVal, authkey : $('#dong_key').val()},
            async: false,
            dataType: 'json',
            success: function(data) {
                var html = "<option>선택</option>";

                for(var i=0;i<data.admVOList.admVOList.length;i++){
                    html +="<option value='"+data.admVOList.admVOList[i].admCode+"'>"+data.admVOList.admVOList[i].lowestAdmCodeNm+"</option>"
                }

                $('#dong_code').html(html);

            },
            error: function(xhr, stat, err) {}
        });
    });
    $(document).on("change","#dong_code",function(){
        var thisVal = $(this).val();
        var addressText= $("#sido_code option:selected").text()+" "+$("#sigoon_code option:selected").text()+" "+$("#dong_code option:selected").text()
        //address

        geocoder(addressText);

    });

})
var dataAjax = function(x,y){
    $.ajax({
        type: "get",
        url: "http://api.vworld.kr/req/data?geomFilter=POINT("+x+" "+y+")",
        data : $('#dataForm').serialize(),
        dataType: 'jsonp',
        async: false,
        success: function(data) {
            var vectorSource = new ol.source.Vector({features: (new ol.format.GeoJSON()).readFeatures(data.response.result.featureCollection)})

            var vector_layer = new ol.layer.Vector({
              source: vectorSource
            })

            vector_layer.set("vectorLayer","search_vector")

            vmap.getLayers().forEach(function(layer){ //기존검색결과 제거
                if(layer.get("vectorLayer")=="search_vector"){
                    vmap.removeLayer(layer);
                }
            });

            vmap.addLayer(vector_layer);


        },
        complete: function(){
            $('#loading').text("");
        },

        error: function(xhr, stat, err) {}
    });
}

/**
 *  지오코더 호출
 */
var geocoder = function(name){
    $.ajax({
        type: "get",
        url: "http://api.vworld.kr/req/address?service=address&version=2.0&request=getcoord&format=json&type=parcel",
        data : {apiKey : $('[name=apiKey]').val(), address : name},
        dataType: 'jsonp',
        success: function(data) {
            result= data;
            move(data.response.result.point.x*1,data.response.result.point.y*1,11);
            var point = ol.proj.transform([ data.response.result.point.x*1, data.response.result.point.y*1],'EPSG:4326', "EPSG:900913");
            dataAjax(point[0],point[1]);
        },
        beforeSend: function(){
            $('#loading').text("로딩중....");
        },

        error: function(xhr, stat, err) {}
    });
}

/**
 *  역 지오코더 호출
 */
var geocoder_reverse = function(x,y){
    $.ajax({
        type: "get",
        url: "http://api.vworld.kr/req/address?service=address&version=2.0&request=getaddress&format=json&type=parcel&crs=epsg:900913",
        data : {apiKey : $('[name=apiKey]').val(), point : x+","+y},
        dataType: 'jsonp',
        success: function(data) {
            var geoResult ="";
            for( i in data.response.result)
            {
                geoResult +=data.response.result[i].text;
            }
            $('#geoAddress').text(geoResult);
        },
        beforeSend: function(){
        },

        error: function(xhr, stat, err) {}
    });
}

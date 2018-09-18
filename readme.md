## 화면 구성안
<hr>


### 화면 전면
1. 지도를 전체 화면에 랜더링 (2D API 1.0)
2. 좌측과 하단에 버튼 생성 (▶,▲)
3. 좌측 버튼 클릭 시 지도 설정 화면 슬라이드

> 체크박스로 생성
> * 항공사진, 배경사진 onoff
> * 교통시설 onoff
> * 행정구역 onoff (광역시도, 시군구, 읍면동)
> * 주제도 onoff

4. 하단 버튼 클릭 시 마커 설정 화면 슬라이드

>   * option - 게이트웨이 종류: LoRa, Wifi, NBIoT...
>   * radio button - coverage(rad): 0.5k, 1k, 2k, 2.5k
>   * option - 그룹 설정: 설정 안함 (selected), 그룹 1, 그룹2, 그룹3.. )
>   * 마커 생성, 실행 취소 버튼




#### 마커에 관하여
> GroupMarker(lon, lat, msg, imgurl), 링크 참조하여 그룹 숨기기, 그룹 보이기 기능
>     <http://dev.vworld.kr/dev/v4dv_opn2dmapguide_s002.do?itfIde=ITFID_00000000000082#>
>
> dragable 하게 생성할 것
>     <http://dev.vworld.kr/dev/v4dv_opn2dmapguide_s002.do?itfIde=ITFID_00000000000089#addMarker>
>

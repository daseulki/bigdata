## 화면 구성안
<hr>


### 화면 전면
1. 지도를 전체 화면에 랜더링 (2D API 1.0)
2. 좌측과 하단에 버튼 생성 (▶,▲)
3. 좌측 버튼 클릭 시 지도 설정 화면 슬라이드

> 라디오 버튼으로 생성
> * 항공사진, 배경사진 toggle

> 체크박스로 생성
> * 교통시설 onoff
> * 행정구역 onoff (광역시도, 시군구, 읍면동)
> * 주제도 onoff

4. 하단 버튼 클릭 시 마커 설정 화면 슬라이드

>   * select option - 게이트웨이 종류: LoRa, Wifi, NBIoT...
>   * select option - 사용자 생성 그룹
>   * radio button - coverage(rad): 0.5k, 1k, 2.5k
>   * button - 그룹 관리(onclick: 팝업 레이어 - 그룹 추가, 그룹 컨트롤 기능 버튼)
>   * button - 개별 마커 컨트롤
>   * select option - 개별 마커 정보
>   * button - 지도 이미지로 저장
>   * button - 지도 초기화(지도에 생성한 모든 객체 삭제)
>   * 마커 생성 버튼



#### 마커에 관하여
> GroupMarker(lon, lat, msg, imgurl), 링크 참조하여 그룹 숨기기, 그룹 보이기 기능
>     <http://dev.vworld.kr/dev/v4dv_opn2dmapguide_s002.do?itfIde=ITFID_00000000000082#>
>
> dragable 하게 생성할 것...
>     <http://dev.vworld.kr/dev/v4dv_opn2dmapguide_s002.do?itfIde=ITFID_00000000000089#addMarker>
>



### 고쳐야하는 부분
> 그룹 마커로 생성한 마커의 개별 삭제 기능이 작동하지 않음..
> 지도 이미지로 저장할때 커버리지 용도로 생성한 원이 함께 저장되지 않음.
> 사용자가 생성한 그룹을 마커 변수에 추가하지 않음 --> 현재 통신망 종류로만 구분됨
> 팝업 레이어에서 그룹 생성시 메인 화면 옵션에 추가 안되는 오류 있음. 

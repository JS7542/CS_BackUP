import React, { useEffect, useRef, useState } from "react";
import "../css/modalA.css";
import aprtPhoto from "./Photo/KakaoTalk_Photo_2024-05-08-01-13-13.jpeg";
const Modal = ({ getApartment }) => {
  const clickApart = (v) => {
    getApartment(v);
  };

  const [address, setAddress] = useState("창원시 의창구"); // 초기 주소값 설정
  const mapRef = useRef(null);
  const [apartInfo, setApartInfo] = useState("");
  const [apartSelect, setapartSelect] = useState(false);

  // 주소를 좌표로 변환하는 함수
  const searchAddressToCoordinate = (address) => {
    const { naver } = window;

    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          alert("Something went wrong!");
          return;
        }

        if (response.v2.meta.totalCount === 0) {
          alert(`No results found for ${address}`);
          return;
        }

        const item = response.v2.addresses[0];
        const point = new naver.maps.LatLng(item.y, item.x);

        const triVienneLocation = new naver.maps.LatLng(
          35.234166467013594,
          128.67239544988956
        );
        var map = new naver.maps.Map(mapRef.current, {
            center: point,
            zoom: 15,
          }),
          marker = new naver.maps.Marker({
            position: triVienneLocation,
            map,
          });
        naver.maps.Event.addListener(marker, "click", function (e) {
          setApartInfo(
            `트리비앙 아파트                                     
            [도로명 주소] - 경상남도 창원시 성산구 원이대로 495 (우)51426                   
            [지번 주소] - 반림동 18`
          );
        }); //마커 이벤트***********************
        const contentString = [
          `<div style="padding:10px;min-width:100px;line-height:100%;">`,
          item.roadAddress ? `[도로명 주소] ${item.roadAddress}<br />` : "",
          item.jibunAddress ? `[지번 주소] ${item.jibunAddress}<br />` : "",
        ].join("");
        var infowindow = new naver.maps.InfoWindow({
          content: contentString,
        });
      }
    );
  };

  // 주소 입력 상태 업데이트
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // 주소 검색 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    searchAddressToCoordinate(address);
  };

  useEffect(() => {
    const { naver } = window;
    const mapCenter = new naver.maps.LatLng(35.2459596336655, 128.694816891338);
    const map = new naver.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: 15,
    });

    // 초기 지도 로드 시 창원시 의창구를 중심으로 설정
    searchAddressToCoordinate(address);

    // Cleanup 함수
    return () => {
      // infoWindowRef.current.colse();
    };
  }, []); // address가 변경될 때마다 useEffect 실행

  return (
    <div className="Select">
      <div className="modalBlackWrapper"></div>
      <div className="map" ref={mapRef}>
        <form className="Search" onSubmit={handleSubmit}>
          <input
            className="address"
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="주소를 입력하세요"
          />
          <button className="btn" type="submit">
            검색
          </button>
        </form>
      </div>
      <div className="list">
        <div className="list2">
          <div className="apartImg">
            {apartInfo? <img src='https://www.landfuture.co.kr:447/img_102/file_root/court_pic/000420/2019/000420-20190130003529-5.jpg' alt="apt"></img> : ""}
          </div>
          <div className="apartInfo">{apartInfo}</div>
        </div>
        {apartInfo? 
        <div className="pyInfo">
          -평수 정보-
          <img src={aprtPhoto} alt="apt" 
          onClick={(e)=>{
            if(apartSelect === false){
              e.currentTarget.style.border="solid 3px #9082e1"
              setapartSelect(true);
            }
            else{
              e.currentTarget.style.border="none"
              setapartSelect(false);
            }
          }}></img>
        </div> : ""}
        
        {apartSelect? 
        <button className="listBtn" onClick={() => clickApart(25)}>
          선택
        </button>
        :
        <button className="listBtn1" onClick={() => clickApart(25)} disabled>
          선택
        </button>}
      </div>
    </div>
  );
};

export default Modal;

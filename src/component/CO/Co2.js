import "./Co.css";

const Co1 = () => {
  return (
    <div className="CoNwrapper">
      <div className="Coimgwrapper">
        <img
          src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190128_155%2F1548661125825Kivz3_JPEG%2FOAG5gRSg14k_3oSWukgpjuk6.jpeg.jpg"
          alt="Coimg"
        ></img>
      </div>
      <div className="Cotitlewrapper">
        <p className="title">공단 인테리어</p>
        <p>tle. 055-282-0939</p>
        <p>page. <a href="https://cafe.naver.com/hong0dan">https://cafe.naver.com/hong0dan</a></p>
        <p>주소. 경남 창원시 성산구 원이대로473번길 20-11<br/>상세 주소. 창원시 성산구 반림동 반송시장내 삼거리 족발집 맞은편에 위치</p>
      </div>
      <div className="Cotextwrapper">
        <pre>
          반송시장 위치.<br/>
          인테리어, 집수리, 전등교체, 도배, 장판, 강마루, 전기 모든 시공 가능합니다.
        </pre>
      </div>
    </div>
  );
};

export default Co1;

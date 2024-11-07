import { useEffect, useRef, useState} from "react";
import "../css/showCo.css";
import Co1 from "./CO/Co1.js"
import Co2 from "./CO/Co2.js"

const ShowCo = (props) => {
  const coDivWapper = useRef();
  const [CoNumber, setCoNumber] = useState(0);

  useEffect(() => {
    if(props.CoState === "true"){
      coDivWapper.current.animate({
        left:['100vw', '21vw']
      },
      {
        duration:1000,
        easing:"ease",
        iterations:1,
        fill:'forwards'
      })
    }
    if(props.CoState === "false"){
      coDivWapper.current.animate({
        left:['21vw', '100vw']
      },
      {
        duration:1000,
        easing:"ease",
        iterations:1,
        fill:'forwards'
      })
    }
  }, [props.CoState]);

  return (
        <div className="coDiv" ref={coDivWapper}>
          <div className="CosideBarWapper">
            <div className="CosideBarWapper1">
              <div className="Menu"
              onClick={()=>{setCoNumber(1)}}
              >
                <div className="CoIcondiv">
                  <img src=" https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240323_198%2F1711171575589YD1WE_JPEG%2FKakaoTalk_20240315_115532658_01.jpg" alt="Coicon"></img>
                </div>
                <span>다온<br/>인테리어<br/>DNK건설</span>
              </div>
              <div className="Menu"
              onClick={()=>{setCoNumber(2)}}
              >
                <div className="CoIcondiv">
                  <img src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190128_155%2F1548661125825Kivz3_JPEG%2FOAG5gRSg14k_3oSWukgpjuk6.jpeg.jpg" alt="Coicon"></img>
                </div>
                <span>공단<br/>인테리어</span>
              </div>
              <div className="Menu">
                <div className="CoIcondiv">
                  <img src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210511_60%2F1620700271401DmlcN_JPEG%2F6R-qITTyJEi9nPgYPTHBM953.jpg" alt="Coicon"></img>
                </div>
                <span>제이 디자인</span></div>
              <div className="Menu">
                <div className="CoIcondiv">
                  <img src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240125_126%2F1706162833457QMmcJ_PNG%2Fa1.png" alt="Coicon"></img>
                </div>
                <span>황가 디자인</span></div>
            </div>
          </div>
          <div className="CoMain">
            {CoNumber===1 ? <Co1></Co1> : CoNumber===2? <Co2></Co2> : <Co1></Co1>}
          </div>
        </div>
    );
  };

export default ShowCo;

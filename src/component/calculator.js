import "../css/calcul.css";
import ShowCo from "./showCo.js"
import { useState, useRef, useEffect} from "react";

const Calcul = (props) => {
  const toggle = useRef();
  const [CoState, setCoState] = useState("false");
  const [Cost, setCost] = useState(0);

  const animationControl = () => {
    toggle.current.classList.add("falseState1");
    toggle.current.classList.remove("fadeOUT");
  };
  const animationControl1 = () => {
    toggle.current.classList.remove("falseState1");
  };

  const showPage = () => {
    const tmpToggle = toggle.current;
    if (CoState === "false") {
      setCoState("true");
      tmpToggle.classList.remove("falseState");
      tmpToggle.classList.remove("falseState1");
      tmpToggle.classList.remove("fadeOUT");
      tmpToggle.classList.add("trueState");
      tmpToggle.addEventListener("transitionend", animationControl1);
    } else if (CoState === "true") {
      setCoState("false");
      tmpToggle.classList.remove("trueState");
      tmpToggle.classList.remove("falseState1");
      tmpToggle.classList.add("fadeOUT");
      tmpToggle.addEventListener("transitionend", animationControl);
    }
  };

  useEffect(()=>{
    var cost1 = Number(props.cost1);
    var cost2 = Number(props.cost2);
    cost1 = Math.ceil(cost1/10000) * 10000;
    cost2 = Math.ceil(cost2/10000) * 10000;
    const result = cost1 + cost2;
    setCost(result);
  },[props.cost1, props.cost2])
  return (
    <div>
      <div className="falseState" ref={toggle}>
        <h1 className="cal">정산 : {Cost}</h1>
        <h1 className="goShow" 
        onClick={(e)=>{showPage(e)}} 
        >
          {CoState === "false" ? "인테리어 업체보러가기" : "창닫기"}
        </h1>
      </div>
      <ShowCo CoState={CoState}></ShowCo>
    </div>
  );
};
export default Calcul;

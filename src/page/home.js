import "../css/home.css";
import bottom from "./Svg/bottom.svg";
import window from "./Svg/window.svg";
import right from "./Svg/right.svg";
import bed from "./Svg/bed.svg";
import carpet from "./Svg/carpet.svg";
import chair from "./Svg/chair.svg";
import clock from "./Svg/clock.svg";
import desk from "./Svg/desk.svg";
import { Link } from "react-router-dom";

function home() {
  return (
    <div className="App">
      <img src={bottom} className="bottom" alt="bottom" />
      <img src={window} className="window" alt="window" />
      <img src={right} className="right" alt="right" />
      <img src={bed} className="bed" alt="bed" />
      <img src={carpet} className="carpet" alt="carpet" />
      <img src={chair} className="chair" alt="chair" />
      <img src={desk} className="desk" alt="desk" />
      <img src={clock} className="clock" alt="clock" />
      <Link to="/main" className="bo_title">
        Let's Go Main
      </Link>
      <h1 className="home_title">HOME PLANNER</h1>
      <hr className="home_title_under"></hr>
    </div>
  );
}

export default home;

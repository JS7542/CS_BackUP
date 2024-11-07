import "../css/topbar.css";
import { Link } from "react-router-dom";

const topBar = () => {
  return (
    <div className="topbar_wrapper">
      <div>
        <Link to="/" className="top_title">
          HOME PLANNER
        </Link>
      </div>
      <div>save</div>
      <div>setting</div>
    </div>
  );
};
export default topBar;

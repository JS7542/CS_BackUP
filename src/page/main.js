import React, { useState } from "react";
import "../css/main.css";
// import Modal from "../component/modal";
import ModalA from "../component/modalApart";
import Bar from "../component/sideBar";
import Canvas3D from "../component/canvas";
import Calcuator from "../component/calculator";
import Topbar from "../component/topBar";
// import { cos } from "three/examples/jsm/nodes/Nodes.js";

const Main = () => {
  const [Widedata, setWidedata] = useState();
  const [apartment, setapartment] = useState();
  const [CateinName, setCateinName] = useState();
  const [wallpaperCost, setwallpaperCost] = useState(0);
  const [floorCost, setfloorCost] = useState(0);
  const [CostCate, setCostCate] = useState(0);

  const getWide = (ModaldataWide) => {
    setWidedata(ModaldataWide);
  };

  const getApartment = (ModaldataA) => {
    setapartment(ModaldataA);
  };

  const getName = (NameElement) => {
    setCateinName(NameElement);
  };

  const getCostfromBar = (Costdata) => {
    setCostCate(Costdata);
  };

  const getCostfromCanvas1 = (Costdata) => {
    setfloorCost(Costdata);
  };

  const getCostfromCanvas2 = (Costdata) => {
    setwallpaperCost(Costdata);
  };
  return (
    <div className="main">
      {apartment ? (
        ""
      ) : (
        <ModalA getApartment={getApartment} getWide={getWide} />
      )}
      <Topbar></Topbar>
      {apartment ? (
        <Canvas3D
          getCostfloor={getCostfromCanvas1}
          getCostwallpaper={getCostfromCanvas2}
          ElementName={CateinName}
          cost={CostCate}
        ></Canvas3D>
      ) : (
        ""
      )}
      {apartment ? (
        <Bar Widedata={Widedata} getName={getName} getCost={getCostfromBar} />
      ) : (
        ""
      )}
      {apartment ? (
        <Calcuator cost1={wallpaperCost} cost2={floorCost}></Calcuator>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;

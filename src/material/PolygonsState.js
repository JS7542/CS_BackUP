import Wall from "./default.jpg";
import Tail2 from "./bottom/13462_terrace.jpg";
import { useState } from "react";
export const usePolys = () => {
  const [polygons, setPolygons] = useState([
    {
      // 거실 +방
      polys: [
        {
          points: [
            { x: -420.0, y: -430.0 },
            { x: -420.0, y: -130.0 },
            { x: -270.0, y: -130.0 },
            { x: -270.0, y: 0 },
            { x: -170.0, y: 0 },
            { x: -170.0, y: 380.0 },
            { x: 0, y: 380.0 },
            { x: 0, y: 330.0 },
            { x: 520, y: 330.0 },
            { x: 520, y: 75 },
            { x: 300, y: 75 },
            { x: 300, y: -80 },
            { x: 520, y: -80 },
            { x: 520, y: -430.0 },
          ],
          texture: Wall,
          repeat: 10000,
          objectType: "Btm",
          section: "Usual",
        },
        {
          points: [
            // 화장실
            { x: 520, y: 75 },
            { x: 300, y: 75 },
            { x: 300, y: -80 },
            { x: 520, y: -80 },
          ],
          texture: Wall,
          repeat: 1000,
          objectType: "Btm",
          section: "Restroom",
        },
        {
          points: [
            // 발코니 1
            { x: -170.0, y: 380.0 },
            { x: -170, y: 520 },
            { x: 170, y: 520 },
            { x: 170, y: 450 },
            { x: 520, y: 450 },
            { x: 520, y: 330 },
            { x: 0, y: 330 },
            { x: 0, y: 380 },
          ],
          texture: Tail2,
          repeat: 1000,
          repeaty: 3000,
          objectType: "Btm",
          section: "Balcony",
        },
        {
          points: [
            // 발코니 2
            { x: -420, y: -430 },
            { x: 520, y: -430 },
            { x: 520, y: -550 },
            { x: 170, y: -550 },
            { x: 170, y: -600 },
            { x: -130, y: -600 },
            { x: -130, y: -550 },
            { x: -420, y: -550 },
          ],
          texture: Tail2,
          repeat: 1000,
          repeaty: 1100,
          objectType: "Btm",
          section: "Balcony",
        },
        {
          points: [
            // 현관
            { x: -420, y: -130 },
            { x: -420, y: 0 },
            { x: -270, y: 0 },
            { x: -270, y: -130 },
          ],
          texture: Tail2,
          repeat: 1000,
          objectType: "Btm",
          section: "Entrance",
        },
      ],
    },
  ]);

  return [polygons, setPolygons];
};

export default usePolys;

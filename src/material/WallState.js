import Wall from "./default.jpg";
import EntranceTail from "./tail/45035907.jpg";
import { useState } from "react";
import Door from "./furniture/Door_1_MaxBel.obj";
const useRooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1, //기본 틀**************************************
      walls: [
        /********************1번방 ********************/
        {
          //1번방 동쪽 벽
          position: [280, 100, 180],
          dimensions: [320, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //1번방 서쪽벽
          position: [280, 100, 420],
          dimensions: [300, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //1번방 남쪽 벽
          position: [430, 100, 400],
          dimensions: [60, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //1번방 남쪽 벽
          position: [430, 100, 195],
          dimensions: [50, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //1번방 북쪽 벽
          position: [130, 190, 230],
          dimensions: [80, 20, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //1번방 북쪽 벽
          position: [130, 100, 345],
          dimensions: [150, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        /********************2번방 ********************/
        {
          //2번방 서쪽벽
          position: [250, 100, -170],
          dimensions: [360, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //2번방 동쪽벽
          position: [250, 100, -520],
          dimensions: [360, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //2번방 남쪽 벽
          position: [430, 100, -495],
          dimensions: [70, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //2번방 남쪽 벽
          position: [430, 100, -200],
          dimensions: [60, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //2번방 북쪽 벽
          position: [80, 100, -400],
          dimensions: [240, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //2번방 북쪽 벽
          position: [80, 190, -240],
          dimensions: [80, 20, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //2번방 북쪽 벽
          position: [80, 100, -185],
          dimensions: [30, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        /********************3번방 ********************/
        {
          //3번방 남쪽 벽
          position: [-80, 100, -400],
          dimensions: [240, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //3번방 남쪽 벽
          position: [-80, 190, -240],
          dimensions: [80, 20, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //3번방 남쪽 벽
          position: [-80, 100, -185],
          dimensions: [30, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //3번방 동쪽 벽
          position: [-202.5, 100, -520],
          dimensions: [265, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //3번방 서쪽 벽
          position: [-202.5, 100, -170],
          dimensions: [265, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //3번방 북쪽 벽
          position: [-330, 100, -495],
          dimensions: [70, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //3번방 북쪽 벽
          position: [-330, 100, -200],
          dimensions: [60, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        /********************화장실 ********************/

        {
          //화장실 동쪽 벽
          position: [0, 100, -520],
          dimensions: [140, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //화장실 서쪽 벽
          position: [-50, 100, -300],
          dimensions: [40, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //화장실 서쪽 벽
          position: [60, 100, -300],
          dimensions: [20, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //화장실 서쪽 벽
          position: [10, 190, -300],
          dimensions: [80, 20, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },

        /********************거실 및 주방 ********************/
        {
          //거실 및 주방 남쪽 벽
          position: [430, 100, 140],
          dimensions: [60, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //거실 및 주방 남쪽 벽
          position: [430, 100, -140],
          dimensions: [60, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //거실 및 주방 북쪽 벽
          position: [-330, 100, -155],
          dimensions: [35, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //거실 및 주방 북쪽 벽
          position: [-330, 100, -17.5],
          dimensions: [50, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //거실 및 주방 북쪽 벽
          position: [-355, 100, 0],
          dimensions: [70, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //거실 및 주방 북쪽 벽
          position: [-380, 100, 90],
          dimensions: [180, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        {
          //거실 및 주방 서쪽 벽
          position: [-190, 100, 180],
          dimensions: [400, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
        {
          //거실 및 주방 북쪽 벽
          position: [0, 100, 220],
          dimensions: [100, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        /********************현관 ********************/

        //현관 북쪽 벽
        {
          position: [0, 100, 280],
          dimensions: [30, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        //현관 북쪽 벽
        {
          position: [0, 100, 400],
          dimensions: [60, 200, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        //현관 북쪽 벽
        {
          position: [0, 190, 330],
          dimensions: [80, 20, 20],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
        },
        //현관 서쪽 벽
        {
          position: [60, 100, 420],
          dimensions: [140, 200, 20],
          image: Wall,
          rotate: [0, 0, 0],
        },
      ],
    },
    {
      id: 2, //방 1*********************************************
      walls: [
        {
          //1번방 동쪽 벽
          position: [280, 100, 190.1],
          dimensions: [279, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Room1",
        },
        {
          //1번방 서쪽 벽
          position: [280, 100, 409.9],
          dimensions: [280, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Room1",
        },
        {
          //1번방 남쪽 벽
          position: [419.9, 100, 390],
          dimensions: [40, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room1",
        },
        {
          //1번방 남쪽 벽
          position: [419.9, 100, 205],
          dimensions: [30, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room1",
        },
        {
          //1번방 북쪽 벽
          position: [140.1, 100, 340],
          dimensions: [140, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room1",
        },
        {
          //1번방 북쪽 벽
          position: [140.1, 190, 230],
          dimensions: [80, 20, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room1",
        },
      ],
      doors: [
        {
          position: [130, 90, 230], // 문의 위치 조정
          doorForm: Door, //문 형태 지정
          scale: [0.085, 0.085, 0.085], // 문의 크기 조정
          rotate: [0, (Math.PI / 2) * 3, 0],
        },
      ],
    },
    {
      id: 3, //방 2**********************************************
      walls: [
        {
          //2번방 서쪽벽
          position: [255.0, 100, -180.25],
          dimensions: [330, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Room2",
        },
        {
          //2번방 동쪽벽
          position: [255.0, 100, -509.75],
          dimensions: [330, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Room2",
        },
        {
          //2번방 남쪽 벽
          position: [419.75, 100, -485.0],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room2",
        },
        {
          //2번방 남쪽 벽
          position: [419.75, 100, -205],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room2",
        },
        {
          //2번방 북쪽 벽
          position: [90.25, 100, -395],
          dimensions: [230, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room2",
        },
        {
          //2번방 북쪽 벽
          position: [90.25, 190, -240],
          dimensions: [80, 20, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room2",
        },
        {
          //2번방 북쪽 벽
          position: [90.25, 100, -190],
          dimensions: [20, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room2",
        },
      ],
      doors: [
        {
          position: [80, 90, -240], // 문의 위치 조정
          doorForm: Door, //문 형태 지정
          scale: [0.085, 0.085, 0.085], // 문의 크기 조정
          rotate: [0, (Math.PI / 2) * 3, 0],
        },
      ],
    },
    {
      id: 4, //방 3***************************************
      walls: [
        {
          //3번방 남쪽 벽
          position: [-90.25, 100, -395],
          dimensions: [230, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room3",
        },
        {
          //3번방 남쪽 벽
          position: [-90.25, 190, -240],
          dimensions: [80, 20, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room3",
        },
        {
          //3번방 남쪽 벽
          position: [-90.25, 100, -190],
          dimensions: [20, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room3",
        },
        {
          //3번방 동쪽 벽
          position: [-205, 100, -509.75],
          dimensions: [230, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Room3",
        },
        {
          //3번방 서쪽 벽
          position: [-205, 100, -180.25],
          dimensions: [230, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Room3",
        },
        {
          //3번방 북쪽 벽
          position: [-319.75, 100, -485],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room3",
        },
        {
          //3번방 북쪽 벽
          position: [-319.75, 100, -205],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Room3",
        },
      ],
      doors: [
        {
          position: [-80, 90, -240], // 문의 위치 조정
          doorForm: Door, //문 형태 지정
          scale: [0.085, 0.085, 0.085], // 문의 크기 조정
          rotate: [0, Math.PI / 2, 0],
        },
      ],
    },
    {
      id: 5, //주방**********************************************
      walls: [
        {
          //주방 서쪽 벽
          position: [-344.5, 100, 10.25],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //주방 북쪽 벽
          position: [-369.75, 100, 90],
          dimensions: [160, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //주방 서쪽 벽
          position: [-180, 100, 169.75],
          dimensions: [380, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
      ],
      doors: [],
    },
    {
      id: 6, //거실 **********************************************
      walls: [
        {
          //거실 서쪽 벽
          position: [-194.5, 100, -159.75],
          dimensions: [250, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 북쪽 벽
          position: [-319.75, 100, -148.75],
          dimensions: [22.5, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 북쪽 벽
          position: [-319.75, 100, -16.25],
          dimensions: [52.5, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 북쪽 벽
          position: [10.25, 100, 220],
          dimensions: [100, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 방1 문 앞벽
          position: [119.75, 190, 230],
          dimensions: [80, 20, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 남쪽 벽
          position: [119.75, 100, 180],
          dimensions: [20, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 서쪽 벽
          position: [270, 100, 169.75],
          dimensions: [300, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 남쪽 벽
          position: [419.75, 100, 140],
          dimensions: [60, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 남쪽 벽
          position: [419.75, 100, -135],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 동쪽 벽
          position: [245, 100, -159.75],
          dimensions: [350, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 방2 문앞 벽
          position: [69.75, 190, -240],
          dimensions: [80, 20, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 방2 문앞 벽
          position: [69.75, 100, -285],
          dimensions: [10, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 방2 문앞 벽
          position: [69.75, 100, -185],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 화장실 문앞 벽
          position: [-45, 100, -289.75],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 화장실 문앞 벽
          position: [10, 190, -289.75],
          dimensions: [80, 20, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 화장실 문앞 벽
          position: [60, 100, -289.75],
          dimensions: [20, 200, 0.5],
          image: Wall,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 방3 문앞 벽
          position: [-69.75, 190, -240],
          dimensions: [80, 20, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 방3 문앞 벽
          position: [-69.75, 100, -285],
          dimensions: [10, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
        {
          //거실 방3 문앞 벽
          position: [-69.75, 100, -185],
          dimensions: [50, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Living",
        },
      ],
      doors: [],
    },
    {
      id: 7, //화장실***********************************************
      walls: [
        {
          //화장실 문앞 벽
          position: [-45, 100, -310.25],
          dimensions: [200, 50, 0.5],
          image: Wall,
          rotate: [0, 0, Math.PI / 2],
          repeat: [16, 1],
          objectType: "Wall",
          section: "Restroom",
        },
        {
          //화장실 문앞 벽
          position: [15, 190, -310.25],
          dimensions: [20, 70, 0.5],
          image: Wall,
          rotate: [0, 0, Math.PI / 2],
          repeat: [2, 2],
          objectType: "Wall",
          section: "Restroom",
        },
        {
          //화장실 문앞 벽
          position: [60, 100, -310.25],
          dimensions: [200, 20, 0.5],
          image: Wall,
          rotate: [0, 0, Math.PI / 2],
          repeat: [16, 0.2],
          objectType: "Wall",
          section: "Restroom",
        },
        {
          //화장실 남쪽 벽
          position: [69.75, 100, -410],
          dimensions: [200, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, Math.PI / 2],
          repeat: [16, 4],
          objectType: "Wall",
          section: "Restroom",
        },
        {
          //화장실 북쪽 벽
          position: [-69.75, 100, -410],
          dimensions: [200, 200, 0.5],
          image: Wall,
          rotate: [0, Math.PI / 2, Math.PI / 2],
          repeat: [16, 4],
          objectType: "Wall",
          section: "Restroom",
        },
        {
          //화장실 동쪽 벽
          position: [0, 100, -509.75],
          dimensions: [200, 140, 0.5],
          image: Wall,
          rotate: [0, 0, Math.PI / 2],
          repeat: [16, 3],
          objectType: "Wall",
          section: "Restroom",
        },
      ],
      doors: [
        {
          position: [10, 90, -300], // 문의 위치 조정
          doorForm: Door, //문 형태 지정
          scale: [0.085, 0.085, 0.085], // 문의 크기 조정
          rotate: [0, 0, 0],
        },
      ],
    },
    {
      id: 8, // 현관***********************************************
      walls: [
        {
          //현관 북쪽 벽
          position: [119.75, 100, 340],
          dimensions: [140, 200, 0.5],
          image: EntranceTail,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Entrance",
        },
        {
          //현관 동쪽 벽
          position: [65, 100, 409.75],
          dimensions: [110, 200, 0.5],
          image: EntranceTail,
          rotate: [0, 0, 0],
          objectType: "Wall",
          section: "Entrance",
        },
        {
          //현관 문앞벽
          position: [10.25, 100, 390],
          dimensions: [40, 200, 0.5],
          image: EntranceTail,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Entrance",
        },
        {
          //현관 문앞벽
          position: [10.25, 190, 332.5],
          dimensions: [75, 20, 0.5],
          image: EntranceTail,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Entrance",
        },
        {
          //현관 문앞벽
          position: [10.25, 100, 282.5],
          dimensions: [25, 200, 0.5],
          image: EntranceTail,
          rotate: [0, Math.PI / 2, 0],
          objectType: "Wall",
          section: "Entrance",
        },
      ],
      doors: [
        {
          position: [0, 90, 330], // 문의 위치 조정
          doorForm: Door, //문 형태 지정
          scale: [0.085, 0.085, 0.085], // 문의 크기 조정
          rotate: [0, (Math.PI / 2) * 3, 0],
        },
      ],
    },
    // 방 추가 위치
  ]);

  return [rooms, setRooms];
};

export default useRooms;

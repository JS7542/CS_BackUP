import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import Door_texture from "./furniture/wood_diffuse.jpg";
import useRooms from "./WallState"; // 경로 확인
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Html } from "@react-three/drei";
function Wall({
  position,
  dimensions,
  image,
  rotate,
  repeat,
  objectType,
  section,
}) {
  const meshRef = useRef();
  const [loadedTexture, setLoadedTexture] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    setIsLoading(true); // 이미지 로딩 시작
    const loader = new TextureLoader();
    loader.load(image, (texture) => {
      setLoadedTexture(texture);
      setIsLoading(false); // 이미지 로딩 완료
    });
  }, [image]);

  useEffect(() => {
    if (!meshRef.current || !loadedTexture) {
      setIsLoading(true); // 이미지가 아직 로드되지 않았다면 로딩 상태를 true로 설정

      return;
    }

    setIsLoading(true); // 이미지 로딩 시작
    // 텍스처 클론 생성
    const texture = loadedTexture.clone();

    const aspectRatio = loadedTexture.image.width / loadedTexture.image.height;

    // 이미지의 비율에 따라 텍스처의 repeat 값을 조정
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    if (repeat) {
      texture.repeat.set(repeat[0] * aspectRatio, repeat[1]);
    } else {
      texture.repeat.set(
        (dimensions[0] / 40) * aspectRatio,
        dimensions[1] / 40
      );
    }
    texture.needsUpdate = true; // 텍스처 업데이트 필요 표시

    // 메시의 매터리얼을 업데이트
    meshRef.current.material.map = texture;
    meshRef.current.material.needsUpdate = true;

    meshRef.current.userData.objectType = objectType;
    meshRef.current.userData.section = section;
    setIsLoading(false); // 이미지 로딩 완료
  }, [loadedTexture, dimensions, repeat, objectType, section]);

  useEffect(() => {
    // 회전값 적용
    if (rotate && meshRef.current) {
      meshRef.current.rotation.x = rotate[0];
      meshRef.current.rotation.y = rotate[1];
      meshRef.current.rotation.z = rotate[2];
    }
  }, [rotate]);

  return (
    <>
      {isLoading ? (
        <Html center>
          <TailSpin color="#7469b6" height={100} width={100} />
        </Html>
      ) : (
        ""
      )}
      <mesh position={position} ref={meshRef}>
        <boxGeometry attach="geometry" args={dimensions} />
        <meshStandardMaterial attach="material" map={loadedTexture} />
      </mesh>
    </>
  );
}

function Door({ position, doorForm, scale, rotate }) {
  const obj = useLoader(OBJLoader, doorForm);
  const texture = useLoader(TextureLoader, Door_texture);

  const doorObj = useMemo(() => {
    const clonedObj = obj.clone();

    clonedObj.traverse((child) => {
      if (child.isMesh) {
        const clonedTexture = texture.clone();
        child.material = child.material.clone();
        child.material.map = clonedTexture;
      }
    });

    clonedObj.rotation.x = rotate[0];
    clonedObj.rotation.y = rotate[1];
    clonedObj.rotation.z = rotate[2];

    return clonedObj;
  }, [obj, texture, rotate]);

  return <primitive object={doorObj} position={position} scale={scale} />;
}

function Room({ walls, doors }) {
  return (
    <>
      {walls.map((wall, index) => (
        <Wall
          key={index}
          position={wall.position} //벽 위치
          dimensions={wall.dimensions} //벽 두께
          image={wall.image} //벽지
          rotate={wall.rotate} //회전
          objectType={wall.objectType} //바닥,벽 확인
          section={wall.section} //구역
          repeat={wall.repeat} //맵핑 반복수
        />
      ))}
      {doors &&
        doors.map((door, index) => (
          <Door
            key={index}
            position={door.position} //문 위치
            doorForm={door.doorForm} //문의 형태
            scale={door.scale} //크기 조절
            rotate={door.rotate} //회전
          />
        ))}
    </>
  );
}
function WallElements({ wallInfo }) {
  const sendCost = (calCost) => {
    wallInfo.getCostwallpaper(calCost);
  };
  const [rooms, setRooms] = useRooms();
  const [imageURL, setImageURL] = useState();
  const server = "/amazon/";
  var livingCost = 0;
  var room1Cost = 0;
  var room2Cost = 0;
  var room3Cost = 0;
  var tailCost = 0;
  var otherCostWall = 1440000;
  var otherCostTail = 1000000;
  var calCost =
    livingCost +
    room1Cost +
    room2Cost +
    room3Cost +
    tailCost +
    otherCostTail +
    otherCostWall;
  useEffect(() => {
    if (wallInfo.ElementName) {
      fetchImage(wallInfo.ElementName);
    }
  }, [wallInfo.ElementName]);

  // 서버로부터 이미지를 받아오는 함수
  const fetchImage = async (elementName) => {
    try {
      const response = await axios.get(`/api/images/?fileNames=${elementName}`);
      setImageURL(response.data[0]);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (imageURL) {
      var url = imageURL;
      var urlStr = url.substr(39);
      var imgUrl = server + urlStr;
      if (wallInfo && wallInfo.ElementName) {
        if (wallInfo.objectType === "Wall") {
          if (
            wallInfo.ElementName.substr(0, 1) === "w" ||
            wallInfo.ElementName.substr(0, 1) === "t"
          ) {
            setRooms((currentWalls) => {
              return currentWalls.map((wallGroup) => {
                return {
                  ...wallGroup,
                  walls: wallGroup.walls.map((wall) => {
                    if (wall.section === wallInfo.section) {
                      switch (wall.section) {
                        case "Living":
                          livingCost = (wallInfo.cost * 8.0) / 0.372;
                          calCost =
                            livingCost +
                            room1Cost +
                            room2Cost +
                            room3Cost +
                            tailCost +
                            otherCostTail +
                            otherCostWall;
                          sendCost(calCost);
                          return {
                            ...wall,
                            image: imgUrl,
                          };
                        case "Room1":
                          room1Cost = (wallInfo.cost * 8.0) / 0.158;
                          calCost =
                            livingCost +
                            room1Cost +
                            room2Cost +
                            room3Cost +
                            tailCost +
                            otherCostTail +
                            otherCostWall;
                          sendCost(calCost);
                          return {
                            ...wall,
                            image: imgUrl,
                          };
                        case "Room2":
                          room2Cost = (wallInfo.cost * 8.0) / 0.284;
                          calCost =
                            livingCost +
                            room1Cost +
                            room2Cost +
                            room3Cost +
                            tailCost +
                            otherCostTail +
                            otherCostWall;
                          sendCost(calCost);
                          return {
                            ...wall,
                            image: imgUrl,
                          };
                        case "Room3":
                          room3Cost = (wallInfo.cost * 8.0) / 0.186;
                          calCost =
                            livingCost +
                            room1Cost +
                            room2Cost +
                            room3Cost +
                            tailCost +
                            otherCostTail +
                            otherCostWall;
                          sendCost(calCost);
                          return {
                            ...wall,
                            image: imgUrl,
                          };
                        case "Restroom":
                          tailCost = wallInfo.cost * 6;
                          calCost =
                            livingCost +
                            room1Cost +
                            room2Cost +
                            room3Cost +
                            tailCost +
                            otherCostTail +
                            otherCostWall;
                          sendCost(calCost);
                          return {
                            ...wall,
                            image: imgUrl,
                          };
                        default:
                          tailCost = wallInfo.cost * 6;
                          calCost =
                            livingCost +
                            room1Cost +
                            room2Cost +
                            room3Cost +
                            tailCost +
                            otherCostTail +
                            otherCostWall;
                          sendCost(calCost);
                          return {
                            ...wall,
                            image: imgUrl,
                          };
                      }
                    }
                    return wall;
                  }),
                };
              });
            });
          }
        }
      }
    }
  }, [imageURL]);
  return (
    <>
      {rooms.map((room) => (
        <Room key={room.id} walls={room.walls} doors={room.doors} />
      ))}
    </>
  );
}

export default WallElements;

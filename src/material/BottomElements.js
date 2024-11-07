import { useRef, useEffect, useMemo, useState } from "react";
import usePolys from "./PolygonsState";
import {
  TextureLoader,
  Vector2,
  Shape,
  ShapeGeometry,
  RepeatWrapping,
} from "three";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Html } from "@react-three/drei";
// 각 다각형의 포인트와 텍스처를 정의하는 데이터 구조
function Polygon({ points, textureUrl, repeat, repeaty, objectType, section }) {
  const meshRef = useRef();
  const [loadedTexture, setLoadedTexture] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  //console.log("구역 : " + section + " 사진" + textureUrl);
  const vectorPoints = useMemo(
    () => points.map((p) => new Vector2(p.x, p.y)),
    [points]
  );

  const shape = useMemo(() => new Shape(vectorPoints), [vectorPoints]);
  const geometry = useMemo(() => new ShapeGeometry(shape), [vectorPoints]);

  useEffect(() => {
    setIsLoading(true); // 이미지 로딩 시작
    const loader = new TextureLoader();
    loader.load(textureUrl, (texture) => {
      setLoadedTexture(texture);
      setIsLoading(false); // 이미지 로딩 완료
    });
  }, [textureUrl]);
  useEffect(() => {
    if (!meshRef.current || !loadedTexture) {
      setIsLoading(true); // 이미지가 아직 로드되지 않았다면 로딩 상태를 true로 설정

      return;
    }

    if (
      loadedTexture &&
      loadedTexture.image &&
      loadedTexture.image.width &&
      loadedTexture.image.height
    ) {
      const texture = loadedTexture.clone(); // 텍스처 복제
      const imageAspect = texture.image.width / texture.image.height;

      const bounds = vectorPoints.reduce(
        (acc, point) => {
          acc.minX = Math.min(acc.minX, point.x);
          acc.maxX = Math.max(acc.maxX, point.x);
          acc.minY = Math.min(acc.minY, point.y);
          acc.maxY = Math.max(acc.maxY, point.y);
          return acc;
        },
        { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
      );

      const width = bounds.maxX - bounds.minX;
      const height = bounds.maxY - bounds.minY;
      const polygonAspect = width / height;

      const adjustedRepeat = repeat / Math.sqrt(polygonAspect * imageAspect);
      let repeatX, repeatY;
      if (section === "Restroom") {
        repeatX = (adjustedRepeat * polygonAspect) / (repeat * 30);
        repeatY = adjustedRepeat / polygonAspect / (repeat * 15);
      } else {
        if (repeaty) {
          repeatX = (adjustedRepeat * polygonAspect) / (repeat * 400);
          repeatY = adjustedRepeat / polygonAspect / (repeaty * 10);
        } else {
          repeatX = (adjustedRepeat * polygonAspect) / (repeat * 140);
          repeatY = adjustedRepeat / polygonAspect / (repeat * 120);
        }
      }

      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(repeatX, repeatY);
      texture.needsUpdate = true;

      if (meshRef.current) {
        meshRef.current.material.map = texture;
        meshRef.current.material.needsUpdate = true;
        meshRef.current.userData.objectType = objectType;
        meshRef.current.userData.section = section;
      }
    }
    setIsLoading(false); // 이미지 로딩 완료
  }, [loadedTexture, points, repeat, repeaty, objectType, section]);

  return (
    <>
      {isLoading ? (
        <Html center>
          <TailSpin color="#7469b6" height={100} width={100} />
        </Html>
      ) : (
        ""
      )}
      <mesh
        ref={meshRef}
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        <ambientLight intensity={0.35} />
        <meshStandardMaterial map={loadedTexture} />
      </mesh>
    </>
  );
}
function Bottom({ polys }) {
  return (
    <>
      {polys.map((poly, index) => (
        <Polygon
          key={index}
          points={poly.points}
          textureUrl={poly.texture}
          repeat={poly.repeat}
          repeaty={poly.repeaty}
          objectType={poly.objectType}
          section={poly.section}
        />
      ))}
    </>
  );
}
function BottomElements({ btmInfo }) {
  const [polygons, setPolygons] = usePolys();
  const [imageURL, setImageURL] = useState();
  const server = "/amazon/";

  const [costs, setCosts] = useState({
    tailCost: 0,
    floorCost: 0,
  });

  const otherCostFloor = 430000;
  const otherCostTail = 1000000;

  const calculateCost = () => {
    return costs.tailCost + costs.floorCost + otherCostFloor + otherCostTail;
  };

  useEffect(() => {
    if (btmInfo.ElementName) {
      fetchImage(btmInfo.ElementName);
    }
  }, [btmInfo]);

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
      const urlStr = imageURL.substr(39);
      const imgUrl = server + urlStr;

      if (btmInfo && btmInfo.ElementName) {
        if (btmInfo.objectType === "Btm") {
          if (
            btmInfo.ElementName.startsWith("f") ||
            btmInfo.ElementName.startsWith("t")
          ) {
            setPolygons((currentPolygons) => {
              return currentPolygons.map((polygonGroup) => {
                return {
                  ...polygonGroup,
                  polys: polygonGroup.polys.map((poly) => {
                    if (poly.section === btmInfo.section) {
                      let newTailCost = costs.tailCost;
                      let newFloorCost = costs.floorCost;

                      switch (poly.section) {
                        case "Usual":
                          const eType = btmInfo.ElementName.substr(6, 2);
                          const eTypeNum = parseInt(eType, 10);
                          if (eTypeNum > 12 && eTypeNum < 25) {
                            newFloorCost = btmInfo.cost * 1;
                          } else {
                            newFloorCost = btmInfo.cost * 25;
                          }
                          break;

                        case "Restroom":
                          newTailCost = btmInfo.cost * 1.5;
                          break;

                        default:
                          newTailCost = btmInfo.cost * 1.5;
                          break;
                      }

                      // 상태 업데이트
                      setCosts((prevCosts) => ({
                        tailCost: newTailCost,
                        floorCost: newFloorCost,
                      }));

                      const calCost = calculateCost();
                      btmInfo.getCostfloor(calCost);

                      return {
                        ...poly,
                        texture: imgUrl,
                      };
                    }
                    return poly;
                  }),
                };
              });
            });
          }
        }
      }
    }
  }, [imageURL, costs]);
  return (
    <>
      {polygons.map(({ polys }, index) => (
        <Bottom key={index} polys={polys} />
      ))}
    </>
  );
}

export default BottomElements;

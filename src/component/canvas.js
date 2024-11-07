import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../css/canvas.css";
import Model from "../material/ModelElement";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Raycaster, Vector2 } from "three";
function ClickDetector({ onObjectClick }) {
  const { scene, camera, gl } = useThree();
  const raycaster = useRef(new Raycaster());
  const mouse = useRef(new Vector2());
  const highlightedObjects = useRef(new Map());
  // 선택된 개체를 추적하기 위한 상태 추가
  const [selectedObject, setSelectedObject] = useState(null);

  const resetHighlight = useCallback(() => {
    highlightedObjects.current.forEach((clone, original) => {
      // 하이라이트된 복제본을 제거합니다.
      scene.remove(clone);
    });
    highlightedObjects.current.clear();
    setSelectedObject(null); // 선택된 개체 상태 초기화
  }, [scene]);

  const onCanvasClick = useCallback(
    (event) => {
      event.preventDefault();
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;

        // 이미 선택된 개체가 다시 클릭된 경우
        if (selectedObject === firstIntersect) {
          resetHighlight();
          onObjectClick({});
          return; // 함수를 종료하여 추가 처리를 방지
        }
        const filteredIntersects = intersects.filter((intersect) => {
          const objectType = intersect.object.userData.objectType;
          return objectType === "Wall" || objectType === "Btm";
        });

        if (filteredIntersects.length > 0) {
          const newSelectedObject = filteredIntersects[0].object;

          onObjectClick({
            objectType: newSelectedObject.userData.objectType,
            section: newSelectedObject.userData.section,
          });

          setSelectedObject(newSelectedObject); // 선택된 개체 상태 업데이트

          resetHighlight();

          scene.traverse((object) => {
            if (
              object.userData.section === newSelectedObject.userData.section &&
              object.userData.objectType ===
                newSelectedObject.userData.objectType
            ) {
              // 객체의 복제본을 생성하고 셰이더를 적용합니다.
              const clone = object.clone();
              clone.material = clone.material.clone();
              clone.material.map = null;
              clone.material.onBeforeCompile = (shader) => {
                shader.fragmentShader = shader.fragmentShader.replace(
                  `#include <dithering_fragment>`,
                  `
                  #include <dithering_fragment>
                  gl_FragColor = mix(gl_FragColor, vec4(0.0, 1.0, 0.0, 0.9), 0.4);
                  gl_FragColor = mix(gl_FragColor, vec4(gl_FragColor.rgb, 0.3), 1.0);
                  `
                );
              };
              clone.material.transparent = true; // 투명도 처리를 활성화합니다.
              clone.material.needsUpdate = true;
              scene.add(clone);
              highlightedObjects.current.set(object, clone);
            }
          });
        } else {
          resetHighlight();
          onObjectClick({}); // 클릭된 객체 정보를 초기화합니다.
        }
      } else {
        resetHighlight();
        onObjectClick({}); // 클릭된 객체 정보를 초기화합니다.
      }
    },
    [camera, gl, scene, onObjectClick, resetHighlight, selectedObject]
  );

  useEffect(() => {
    const canvasElement = gl.domElement;
    canvasElement.addEventListener("click", onCanvasClick);
    return () => canvasElement.removeEventListener("click", onCanvasClick);
  }, [onCanvasClick, gl.domElement]);

  return null;
}

const Canvas3D = (props) => {
  const [clickedObjectInfo, setClickedObjectInfo] = useState({});

  return (
    <div className="Canvas">
      <Canvas camera={{ position: [400, 600, 300], near: 0.1, far: 10000 }}>
        <ambientLight />
        <OrbitControls />
        <Model objectInfo={{ ...clickedObjectInfo, ...props }} />
        <ClickDetector onObjectClick={setClickedObjectInfo} />
      </Canvas>
    </div>
  );
};

export default Canvas3D;

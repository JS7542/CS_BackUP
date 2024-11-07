import Wall from "./WallElements";
import Bottom from "./BottomElements";
import React from "react";
function ModelElement({ objectInfo }) {
  return (
    <>
      {/* Wall 컴포넌트는 항상 렌더링되며, 조건에 따라 props 전달 */}
      <Wall wallInfo={{ ...objectInfo }} />
      {/* Bottom 컴포넌트도 항상 렌더링되며, 조건에 따라 props 전달 */}
      <Bottom btmInfo={{ ...objectInfo }} />
    </>
  );
}

export default ModelElement;

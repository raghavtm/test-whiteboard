import { useEffect, useState } from "react";
import FabricBoard from "../FabricBoard/FabricBoard";
import KonvaBoard from "../KonvaBoard/KonvaBoard";
import PaperJSBoard from "../PaperJSBoard/PaperJSBoard";
import styles from "./Main.module.css";

const BOARD_TYPE = {
  FABRIC: "FABRIC",
  KONVA: "KONVA",
  PAPERJS: "PAPERJS",
  Custom:"Custom"
};

export default function Main() {
  const [boardType, setBoardType] = useState(BOARD_TYPE.Custom);
  let ctx
  useEffect(()=>{
    if(boardType === BOARD_TYPE.Custom){
      const canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      // Set line width
  window.onmousemove = (e)=>{
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(e.offsetX - e.movementX, e.offsetY - e.movementY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke()
  }  
    }
  },boardType) 
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.btnWrapper}>
          <button
            className={boardType === BOARD_TYPE.FABRIC ? styles.selected : ""}
            onClick={() => setBoardType(BOARD_TYPE.FABRIC)}
          >
            Fabric
          </button>
          {/* <button
            className={boardType === BOARD_TYPE.KONVA ? styles.selected : ""}
            onClick={() => setBoardType(BOARD_TYPE.KONVA)}
          >
            Konva
          </button>
          <button
            className={boardType === BOARD_TYPE.PAPERJS ? styles.selected : ""}
            onClick={() => setBoardType(BOARD_TYPE.PAPERJS)}
          >
            PaperJS
          </button> */}
          <button
            className={boardType === BOARD_TYPE.Custom ? styles.selected : ""}
            onClick={() => setBoardType(BOARD_TYPE.Custom)}
          >
            Custom
          </button>
        </div>
        {boardType === BOARD_TYPE.FABRIC && <FabricBoard />}
        {boardType === BOARD_TYPE.KONVA && <KonvaBoard />}
        {boardType === BOARD_TYPE.PAPERJS && <PaperJSBoard />}
        {boardType === BOARD_TYPE.Custom && (
          <>
            <canvas
              id="canvas"
              width={window.innerWidth}
              height={window.innerHeight}
            ></canvas>
            <button
              className={styles.clear}
              onClick={() => {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
              }}
            >
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
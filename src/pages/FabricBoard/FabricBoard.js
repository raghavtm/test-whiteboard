import { useEffect } from "react";
import styles from "./FabricBoard.module.css";
import { fabric } from "fabric";

export default function FabricBoard() {
  var fabricCanvas;

  useEffect(() => {
    const wrapperElem = document.getElementById("wrapper");
    fabricCanvas = new fabric.Canvas("c", {
      width: wrapperElem.clientWidth,
      height: wrapperElem.clientHeight,
      isDrawingMode: true,
    });
    // fabricCanvas.on({
    //   'after:render': () => console.log(Date.now())
    // })
    fabricCanvas.renderAll();
  }, []);


  // console.log(fabricCanvas.)
  return (
    <div id="wrapper" className={styles.wrapper}>
      <button
        className={styles.clear}
        onClick={() => {
          fabricCanvas.clear();
          fabricCanvas.backgroundColor = "white";
        }}
      >
        Clear
      </button>
      <canvas id="c"></canvas>
    </div>
  );
}

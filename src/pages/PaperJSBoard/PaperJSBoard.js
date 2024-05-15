import styles from "./PaperJSBoard.module.css";
import Paper, { Tool } from "paper";
import { useEffect, useRef } from "react";

export default function PaperJSBoard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Paper.setup(canvas);
    var path;
    var tool = new Tool();

    // let myPath = new Paper.Path();

    // Paper.view.onMouseUp = (event) => {};

    // Paper.view.onMouseDown = (event) => {
    //   myPath.strokeColor = "#000";
    //   myPath.strokeWidth = 1;
    // };

    // Paper.view.onMouseDrag = (event) => {
    //   myPath.add(event.point);
    // };

    // Paper.view.draw();

    tool.minDistance = 10;

    tool.onMouseDown = function (event) {
      // Create a new path every time the mouse is clicked
      path = new Paper.Path();
      path.add(event.point);
      path.strokeColor = "black";
    };

    tool.onMouseDrag = function (event) {
      // Add a point to the path every time the mouse is dragged
      path.add(event.point);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.clear}
        onClick={() => {
          Paper.project.activeLayer.removeChildren();
        }}
      >
        Clear
      </button>
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
}

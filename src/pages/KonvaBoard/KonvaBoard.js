import Konva from "konva";
import { useEffect } from "react";
import styles from "./KonvaBoard.module.css";

export default function KonvaBoard() {
  var width = window.innerWidth;
  var height = window.innerHeight - 25;

  var stage;
  var layer;

  var isPaint = false;
  var mode = "brush";
  var lastLine;

  useEffect(() => {
    // first we need Konva core things: stage and layer
    stage = new Konva.Stage({
      container: "container",
      width: width,
      height: height,
    });

    layer = new Konva.Layer();
    stage.add(layer);

    stage.on("mousedown touchstart", function (e) {
      isPaint = true;
      var pos = stage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: "#000",
        strokeWidth: 1,
        globalCompositeOperation:
          mode === "brush" ? "source-over" : "destination-out",
        // round cap for smoother lines
        lineCap: "round",
        lineJoin: "round",
        // add point twice, so we have some drawings even on a simple click
        points: [pos.x, pos.y, pos.x, pos.y],
      });
      layer.add(lastLine);
    });

    stage.on("mouseup touchend", function () {
      isPaint = false;
    });

    // and core function - drawing
    stage.on("mousemove touchmove", function (e) {
      if (!isPaint) {
        return;
      }

      // prevent scrolling on touch devices
      e.evt.preventDefault();

      const pos = stage.getPointerPosition();
      var newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.clear}
        onClick={() => {
          stage.clear();
          layer.clear();
        }}
      >
        Clear
      </button>
      <div id="container"></div>
    </div>
  );
}

import { enemyAdjectives } from "@/constants/enemy";
import React, { useEffect, useRef, useState } from "react";

const Canvas = ({
  currentEnemy,
  currentEnemyNumber,
  maxEnemyNumber,
  currentEnemyShape,
  currentEnemyType,
  currentBossIndex,
  onEnemyDeath,
  handleClick,
  isEnemyShiny,
}: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const randomAdjective =
    enemyAdjectives[currentEnemyShape][
      Math.floor(Math.random() * enemyAdjectives[currentEnemyShape].length)
    ];

  const [currentEnemyAdjective, setCurrentEnemyAdjective] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      (canvas.width = 220), (canvas.height = 220);
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (isEnemyShiny) context.fillStyle = "rgb(128, 255, 0)";
        else context.fillStyle = "rgb(215, 212, 218)";

        if (currentEnemyShape === "Ellipse") {
          context.ellipse(
            canvas.width / 2,
            canvas.height / 2,
            currentEnemy.radiusX,
            currentEnemy.radiusY,
            currentEnemy.rotation,
            0,
            2 * Math.PI
          );
        } else if (currentEnemyShape === "Rectangle") {
          context.rect(
            (canvas.width - currentEnemy.width) / 2,
            (canvas.height - currentEnemy.height) / 2,
            currentEnemy.width,
            currentEnemy.height
          );
        } else if (currentEnemyShape === "Triangle") {
          context.beginPath();
          context.moveTo(currentEnemy.x1, currentEnemy.y1);
          context.lineTo(currentEnemy.x2, currentEnemy.y2);
          context.lineTo(currentEnemy.x3, currentEnemy.y3);
          context.closePath();
        }

        context.fill();
      }
    }
  }, [currentEnemy]);

  useEffect(() => {
    setCurrentEnemyAdjective(randomAdjective);
  }, [onEnemyDeath]);

  return (
    <div className="">
      <h3 className=" mb-4 text-center font-bold text-lg">
        {currentEnemyNumber === maxEnemyNumber
          ? `*${currentEnemyAdjective} ${currentEnemyShape}*`
          : `${currentEnemyAdjective} ${currentEnemyShape}`}
      </h3>

      <div className="border bg-gray-50">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="drop-shadow-sm active:drop-shadow-lg"
        ></canvas>
      </div>
    </div>
  );
};

export default Canvas;

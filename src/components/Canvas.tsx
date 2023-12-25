import { EllipseEnemy, boss, enemyAdjectives } from "@/constants/enemy";
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
      (canvas.width = 180), (canvas.height = 180);
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgb(215, 212, 218)";

        if (currentEnemyShape === "Ellipse") {
          context.ellipse(
            currentEnemy.centerX,
            currentEnemy.centerY,
            currentEnemy.radiusX,
            currentEnemy.radiusY,
            currentEnemy.rotation,
            0,
            2 * Math.PI
          );
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

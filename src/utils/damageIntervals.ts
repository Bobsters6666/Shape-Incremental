// import { helpers } from "@/constants/helpers";
// import { useGameState } from "@/hooks";
// import { useEffect } from "react";

// export const damageIntervals = () => {
//   const { currentEnemy, setCurrentEnemy } = useGameState()

//   useEffect(() => {
//     const circleInterval = setInterval(() => {
//       setCurrentEnemy((prev) => ({
//         ...prev,
//         health: prev.health - helpers[0].magic * helpers[0].interval,
//       }));
//     }, helpers[0].interval * 1000);

//     return () => {
//       clearInterval(circleInterval);
//     };
//   }, []);
// }

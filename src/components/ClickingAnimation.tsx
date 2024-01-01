import React from "react";
import { motion } from "framer-motion";
import { fadeOutCircle } from "@/utils/animations";
import { nf } from "@/utils/utils";

const ClickingAnimation = ({
  isCrit,
  mousePosition,
  id,
  attack,
  critDamage,
  attackMultiplier,
}: any) => {
  return (
    <div
      key={id}
      style={{
        position: "absolute",
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      className="select-none pointer-events-none"
    >
      <motion.div variants={fadeOutCircle} initial="initial" animate="animate">
        {isCrit ? (
          <p className="text-orange-700 text-lg">
            -{nf((attack * critDamage * attackMultiplier) / 100)}
          </p>
        ) : (
          <p className="text-orange-400 text-md">
            -{nf(attack * attackMultiplier)}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ClickingAnimation;

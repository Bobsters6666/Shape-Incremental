import { helpers } from "@/constants/helpers";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { bounce } from "@/utils/animations";
import Image from "next/image";

const HelpersField = ({
  helperAnimations,
  handleClick,
  setCurrentEnemy,
  setHelperAnimations,
}: any) => {
  useEffect(() => {
    const intervals = helpers.map((helper, index) => {
      return setInterval(() => {
        setCurrentEnemy((prev: any) => ({
          ...prev,
          health: prev.health - helper.magic * helper.interval,
        }));

        setHelperAnimations(helpers.map(() => false));

        if (helper.level > 0) {
          setHelperAnimations((prev: any) =>
            prev.map((animation: any, i: number) =>
              i === index ? !animation : animation
            )
          );
        }
      }, helper.interval * 1000);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-36 items-end justify-end w-48">
        <div className="border-b-2 border-black w-full">1</div>
        <div className="border-b-2 border-black w-full">2</div>
        <div className="border-b-2 border-black w-full flex gap-2">
          {helpers.map((helper, index) => (
            <motion.div
              variants={bounce}
              initial="initial"
              animate={helperAnimations[index] ? "animate" : "initial"}
              key={helper.name}
              className={`${helper.level > 0 ? "block" : "hidden"}`}
            >
              <Image
                src={helper.icon}
                alt={helper.name}
                width={100}
                height={100}
                onClick={handleClick}
                priority={true}
                className="w-6"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpersField;

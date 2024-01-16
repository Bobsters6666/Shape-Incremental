"use client";

import { helpers } from "@/constants/helpers";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { bounce } from "@/utils/animations";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HelpersField = ({ setCurrentEnemy }: any) => {
  const [helperAnimations, setHelperAnimations] = useState(
    helpers.map(() => false)
  );

  useEffect(() => {
    const intervals = helpers.map((helper, index) => {
      return setInterval(() => {
        setCurrentEnemy((prev: any) => ({
          ...prev,
          health: prev.health - helper.magic * helper.interval,
        }));

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

  // console.log(helperAnimations);

  return (
    <section>
      <Dialog>
        <div className="flex flex-col gap-36 items-end justify-end w-48 mt-40">
          <div className="border-b-2 border-black w-full"></div>
          <div className="border-b-2 border-black w-full flex gap-2">
            {helpers.slice(6, 11).map((helper, index) => (
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
                  priority={true}
                  className="w-7"
                />
              </motion.div>
            ))}
          </div>
          <div className="border-b-2 border-black w-full flex gap-2">
            {helpers.slice(0, 6).map((helper, index) => (
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
                  priority={true}
                  className="w-7"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default HelpersField;

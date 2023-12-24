import { helpers } from "@/constants/helpers";
import React from "react";
import { motion } from "framer-motion";
import { bounce } from "@/utils/animations";
import Image from "next/image";

const HelpersField = ({ helperAnimations, handleClick }: any) => {
  return (
    <section>
      <div className="flex flex-col gap-36 items-end justify-end w-36">
        <div className="border-b-2 border-black w-full">1</div>
        <div className="border-b-2 border-black w-full">2</div>
        <div className="border-b-2 border-black w-full flex gap-2">
          {helpers.map((helper, index) => (
            <motion.div
              variants={bounce}
              initial="initial"
              animate={helperAnimations[index] ? "animate" : "initial"}
              key={helper.name}
              className={`${helper.name}-helper`}
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

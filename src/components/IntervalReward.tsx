import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const variants = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [0, 250, 0, -250, 0],
    y: [0, -100, 100, -100, 0],

    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

let amount: number;

const IntervalReward = ({ setCrystal }: any) => {
  const [show, setShow] = useState(false);

  const awardRandomCrystalAmount = () => {
    amount = Math.round(Math.random() * 13 + 7);

    setCrystal((prev: number) => prev + amount);

    setTimeout(() => {
      setShow(false);
    }, 800);
  };

  useEffect(() => {
    const showReward = setInterval(() => {
      setShow(!show);
    }, 200000);

    return () => clearInterval(showReward);
  }, []);

  return (
    <>
      {show && (
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="absolute bottom-[35%] w-32 h-8 bg-purple-100 grid place-items-center rounded-lg text-xs cursor-pointer shadow-md"
              onClick={() => awardRandomCrystalAmount()}
            >
              <p className="font-semibold">Click me</p>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="pb-10">
            <DialogHeader>
              <DialogTitle className="text-center text-xl mb-8">
                You received {amount} crystals!
              </DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default IntervalReward;

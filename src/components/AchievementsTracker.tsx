"use client";

import React, { useEffect } from "react";
import { hero } from "@/constants/hero";
import { achievements } from "@/constants/achievements";

interface AchievementsTrackerProps {
  gold: number;
}

const AchievementsTracker = ({ gold }: AchievementsTrackerProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (hero.level >= 10) {
        achievements.lv10.completed = true;
      }

      if (hero.level >= 50) {
        achievements.lv50.completed = true;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [hero, gold]);

  return <></>;
};

export default AchievementsTracker;

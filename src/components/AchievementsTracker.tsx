"use client";

import React, { useEffect, useState } from "react";
import { hero } from "@/constants/hero";
import { Achievements, achievements } from "@/constants/achievements";
import { motion } from "framer-motion";
import { popUp } from "@/utils/animations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface AchievementPopupProps {
  isVisible: boolean;
  onHide: () => void;
}

const AchievementPopup = ({
  isVisible,
  onHide,
  achievement,
}: AchievementPopupProps & { achievement: Achievements }) => {
  return (
    <>
      {isVisible && (
        <motion.div
          className="min-w-[600px] bg-blue-200 p-6 rounded-[6px]"
          variants={popUp}
          initial="initial"
          animate="animate"
        >
          <h3 className="text-center font-bold text-xl">{achievement.name}</h3>
          <div className="flex items-center justify-between p-6">
            <p>{achievement.description}</p>
            <FontAwesomeIcon
              icon={faCheck}
              className="text-green-500 text-2xl"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

interface AchievementsTrackerProps {
  gold: number;
}

type AchievementKey = keyof typeof achievements;

const AchievementsTracker = ({ gold }: AchievementsTrackerProps) => {
  const [visibleAchievement, setVisibleAchievement] = useState<string | null>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (hero.level >= 10 && !achievements.lv10.completed) {
        achievements.lv10.completed = true;
        setVisibleAchievement("lv10");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (hero.level >= 50 && !achievements.lv50.completed) {
        achievements.lv50.completed = true;
        setVisibleAchievement("lv50");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [hero, gold]);

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
      {Object.keys(achievements).map((achievementKey) => {
        const cAchievement = achievements[achievementKey as AchievementKey];

        return (
          <AchievementPopup
            key={achievementKey}
            isVisible={visibleAchievement === achievementKey}
            onHide={() => setVisibleAchievement(null)}
            achievement={cAchievement}
          />
        );
      })}
    </div>
  );
};

export default AchievementsTracker;

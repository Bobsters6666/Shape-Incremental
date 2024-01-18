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

type AchievementKey = keyof typeof achievements;

const AchievementsTracker = ({
  gold,
  achievementPoints,
  setAchievementPoints,
}: any) => {
  const [visibleAchievement, setVisibleAchievement] = useState<string | null>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (hero.level >= 10 && !achievements.lv10.completed) {
        achievements.lv10.completed = true;
        setAchievementPoints(achievementPoints + achievements.lv10.points);
        setVisibleAchievement("lv10");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (hero.level >= 50 && !achievements.lv50.completed) {
        achievements.lv50.completed = true;
        setAchievementPoints(achievementPoints + achievements.lv50.points);
        setVisibleAchievement("lv50");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (hero.level >= 100 && !achievements.lv100.completed) {
        achievements.lv100.completed = true;
        setAchievementPoints(achievementPoints + achievements.lv100.points);
        setVisibleAchievement("lv100");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (hero.level >= 250 && !achievements.lv250.completed) {
        achievements.lv250.completed = true;
        setAchievementPoints(achievementPoints + achievements.lv250.points);
        setVisibleAchievement("lv250");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (hero.level >= 500 && !achievements.lv500.completed) {
        achievements.lv500.completed = true;
        setAchievementPoints(achievementPoints + achievements.lv500.points);
        setVisibleAchievement("lv500");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (hero.level >= 1000 && !achievements.lv1000.completed) {
        achievements.lv1000.completed = true;
        setAchievementPoints(achievementPoints + achievements.lv1000.points);
        setVisibleAchievement("lv1000");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (gold >= 1000 && !achievements["1kG"].completed) {
        achievements["1kG"].completed = true;
        setAchievementPoints(achievementPoints + achievements["1kG"].points);
        setVisibleAchievement("1kG");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (gold >= 1000000 && !achievements["1mG"].completed) {
        achievements["1mG"].completed = true;
        setAchievementPoints(achievementPoints + achievements["1mG"].points);
        setVisibleAchievement("1mG");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (gold >= 1000000000 && !achievements["1bG"].completed) {
        achievements["1bG"].completed = true;
        setAchievementPoints(achievementPoints + achievements["1bG"].points);
        setVisibleAchievement("1bG");
        setTimeout(() => {
          setVisibleAchievement(null);
        }, 5000);
      }

      if (gold >= 1_000_000_000_000 && !achievements["1tG"].completed) {
        achievements["1tG"].completed = true;
        setAchievementPoints(achievementPoints + achievements["1tG"].points);
        setVisibleAchievement("1tG");
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

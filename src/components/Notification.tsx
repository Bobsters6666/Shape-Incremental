import { helpers } from "@/constants/helpers";
import { notifications } from "@/constants/notifications";
import React, { useEffect } from "react";

interface notificationProps {
  name: string;
  categoryNotifications: any;
}

const PushNotification = ({
  name,
  categoryNotifications,
}: notificationProps) => {
  if (categoryNotifications.length > 0)
    return (
      <div
        key={name}
        className="absolute text-xs rounded-full -top-2 -right-2 w-4 h-4 bg-red-500 text-white grid place-items-center z-20"
      >
        <p>{categoryNotifications.length}</p>
      </div>
    );
  else return <></>;
};

const Notification = ({ gold }: any) => {
  useEffect(() => {
    const checkPushNotification = setInterval(() => {
      helpers.forEach((helper) => {
        if (helper.level === 0 && gold >= helper.cost && !helper.notified) {
          notifications.push("Helper");
          helper.notified = true;
        }
      });
    }, 200);

    return () => clearInterval(checkPushNotification);
  });

  return <></>;
};

export { Notification, PushNotification };

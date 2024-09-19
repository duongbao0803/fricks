"use client";

import { notification } from "antd";
import React, { useEffect, useState } from "react";

let notificationApi: any;

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    notificationApi = api;
  }, [api]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export const notify = (
  type: "success" | "info" | "warning" | "error",
  message: string,
  description: string,
  duration: number,
) => {
  if (notificationApi) {
    notificationApi[type]({
      message,
      description,
      duration: duration || 3,
      showProgress: true,
    });
  } else {
    console.error("Notification API not initialized!");
  }
};

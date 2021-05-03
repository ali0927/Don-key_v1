import React, { createContext, useContext, useState } from "react";
import { Notification } from "./Notification";

export type INotification = {
  msg: React.ReactChild;
  duration?: number;
  type?: "error" | "success";
};
export type NotificationContextType = {
  showNotification: (val: INotification) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [content, setContent] = useState<INotification | null>(null);
  const showNotification = ({ msg, duration = 3000, type }: INotification) => {
    setContent({ msg, duration, type });
    setTimeout(() => {
      setContent(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {content && (
        <Notification variant={content.type}>{content.msg}</Notification>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () =>
  useContext(NotificationContext) as NotificationContextType;

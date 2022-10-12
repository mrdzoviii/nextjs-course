import {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Notification = {
  title: string;
  message: string;
  status: string;
};

export interface INotificationContext {
  notification?: Notification;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
}
export interface INotificationContextProps {
  children?: ReactElement[] | ReactElement;
}

const NotificationContext = createContext<INotificationContext>({
  hideNotification: () => {},
  showNotification: (notification: Notification) => {},
});

export const NotificationContextProvider = ({
  children,
}: INotificationContextProps) => {
  const [activeNotification, setActiveNotification] = useState<
    Notification | undefined
  >(undefined);

  useEffect(() => {
    if (activeNotification && activeNotification.status !== "pending") {
      const timer = setTimeout(() => setActiveNotification(undefined), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const context = useMemo<INotificationContext>(() => {
    const showNotification = (notification: Notification) => {
      setActiveNotification({ ...notification });
    };

    const hideNotification = () => {
      setActiveNotification(undefined);
    };
    return {
      notification: activeNotification,
      showNotification,
      hideNotification,
    };
  }, [activeNotification]);

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

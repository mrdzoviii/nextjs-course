import { useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

export interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function Layout({ children }: ILayoutProps) {
  const { notification } = useContext(NotificationContext);
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
      )}
    </>
  );
}

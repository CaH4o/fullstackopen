import { useEffect } from 'react';

interface NotificationProps {
  notification: string | null;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
}

const Notification = (props: NotificationProps) => {
  useEffect(() => {
    if (props.notification) {
      setTimeout(() => {
        props.setNotification(null);
      }, 3000);
    }
  }, [props.notification]);

  return props.notification ? (
    <div>
      <div style={{ color: 'red' }}>{props.notification}</div>
      <br />
    </div>
  ) : null;
};

export default Notification;

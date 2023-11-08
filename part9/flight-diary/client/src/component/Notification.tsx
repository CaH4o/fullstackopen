import { useEffect } from 'react';

interface NotificationProps {
  notification: string;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const Notification = (props: NotificationProps) => {
  useEffect(() => {
    if (props.notification) {
      setTimeout(() => {
        props.setNotification('');
      }, 3000);
    }
  }, [props.notification]);

  return (
    <div>
      <div style={{ color: 'red' }}>{props.notification}</div>
      <br />
    </div>
  );
};
export default Notification;

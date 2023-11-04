import notification from 'antd/lib/notification';

const openNotification = (message, description) => {
    notification.open({
      message,
      description,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  export const errorNotification = (message, description) => {
    openNotification(message, description);
  };
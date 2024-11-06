import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

// Function to register for push notifications
export const registerForPushNotificationsAsync = async () => {
  // Request permission to receive notifications
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  // If permission is not granted, request permission
  if (status !== 'granted') {
    const { status: askStatus } = await Notifications.requestPermissionsAsync();
    finalStatus = askStatus;
  }

  // If permission is still not granted, alert the user and return
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  // Get the push token (Expo Push Token for Expo push service or FCM token for Firebase)
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  console.log('Push Token:', token); // Log the token to check if it’s generated

  // Send the token to your backend (replace with your backend endpoint)
  await sendTokenToBackend(token);
};

// Function to send the push token to your backend
const sendTokenToBackend = async (token) => {
  try {
    // Replace with your backend URL
    const response = await fetch('https://unendingcalamity.pythonanywhere.com/register-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log('Token sent to backend:', data);
  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
};

// Function to set up the notification handler
export const setNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      console.log('Foreground Notification:', notification);
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    },
  });
};

// Function to listen for incoming notifications
export const listenForNotifications = () => {
  const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
    // Handle the notification when it is received in the foreground
    Alert.alert(
      notification.request.content.title || 'Notification',
      notification.request.content.body || 'You have a new notification.'
    );
    console.log('Notification received:', notification);
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    // Handle user interaction with the notification
    console.log('User interacted with the notification', response);
  });

  return () => {
    // Cleanup listeners when the component is unmounted
    notificationListener.remove();
    responseListener.remove();
  };
};

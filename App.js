import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerForPushNotificationsAsync, listenForNotifications, setNotificationHandler } from './utils/notifications';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreenAdmin from './screens/HomeScreenAdmin';
import AboutUsAdmin from './screens/AboutUsAdmin';
import AboutUsUser from './screens/AboutUsUser';
import HomeScreenUsers from './screens/HomeScreenUsers';
import WeatherForecastAdmin from './screens/WeatherForecastAdmin';
import WeatherForecastUser from './screens/WeatherForecastUser';
import NotificationScreenUser from './screens/NotificationScreenUser';
import ContactScreenEditor from './screens/ContactScreenEditor';
import ContactScreenUser from './screens/ContactScreenUser';
import NotificationScreenEditor from './screens/NotificationScreenEditor';
import PostDetails from './screens/PostDetails';
import { StatusBar, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      // Set the notification handler for foreground notifications
      setNotificationHandler();

      // Register for push notifications
      await registerForPushNotificationsAsync();

      // Listen for incoming notifications
      const unsubscribe = listenForNotifications();
      return unsubscribe; // Cleanup the listener on unmount
    };

    setupNotifications(); // Call the setup function
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreenAdmin"
              component={HomeScreenAdmin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContactScreenEditor"
              component={ContactScreenEditor}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContactScreenUser"
              component={ContactScreenUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationScreenEditor"
              component={NotificationScreenEditor}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationScreenUser"
              component={NotificationScreenUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUsAdmin"
              component={AboutUsAdmin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUsUser"
              component={AboutUsUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreenUsers"
              component={HomeScreenUsers}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WeatherForecastAdmin"
              component={WeatherForecastAdmin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WeatherForecastUser"
              component={WeatherForecastUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PostDetails"
              component={PostDetails}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </>
  );
}

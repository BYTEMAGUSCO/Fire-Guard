import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import styles from '../styles/NotificationScreenEditor';
import BottomNavBar from '../components/BottomNavBarAdmin';
import * as Notifications from 'expo-notifications';
import { ImageBackground } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NotificationScreenEditor = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [processedNotificationIds, setProcessedNotificationIds] = useState(new Set());

  useEffect(() => {
    const notificationsCollection = collection(db, "notifications");
  
    const unsubscribe = onSnapshot(notificationsCollection, (snapshot) => {
      const notificationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      // Sort notifications by timestamp in descending order
      notificationsList.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate());
  
      // Update state with sorted notifications
      setNotifications(notificationsList);
    });
  
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    // Handle notifications when the component is mounted
    const handleNewNotifications = (notificationList) => {
      notificationList.forEach(notification => {
        if (!processedNotificationIds.has(notification.id)) {
          // Uncomment if you want to send notifications based on a condition
          // sendEmergencyNotification(notification.message);
          processedNotificationIds.add(notification.id); // Add to processed IDs
        }
      });
      // Update the processed IDs state
      setProcessedNotificationIds(new Set(processedNotificationIds));
    };

    handleNewNotifications(notifications);
  }, [notifications]); // Only runs when notifications change

  const handleSendNotification = async () => {
    if (message.trim() === '') {
      Alert.alert("Error", "Notification message cannot be empty");
      return;
    }
    try {
      await addDoc(collection(db, "notifications"), { message, timestamp: new Date() });
      setMessage('');
      Alert.alert("Success", "Notification sent");
    } catch (error) {
      Alert.alert("Error", "Failed to send notification: " + error.message);
    }
  };

  const handleDeleteNotification = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: async () => {
            try {
              await deleteDoc(doc(db, "notifications", id));
              Alert.alert("Success", "Notification deleted");
            } catch (error) {
              Alert.alert("Error", "Failed to delete notification: " + error.message);
            }
          }, style: "destructive"
        }
      ]
    );
  };

  const sendEmergencyNotification = async (alertMessage) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚨 Emergency Alert",
        body: alertMessage,
        sound: true,
      },
      trigger: null, // Triggers immediately
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')} // Ensure the path to your image is correct
        style={{
          position: 'absolute', // Position absolute to fill the container
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5, // Set the opacity here if you want it
          resizeMode: 'cover', // Ensures the image covers the entire area
        }}
      />
      <Text style={styles.title}>Admin Notifications</Text>

      <TextInput
        placeholder="Type your notification here..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendNotification}>
        <Text style={styles.sendButtonText}>Send Notification</Text>
      </TouchableOpacity>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTimestamp}>
              {item.timestamp ? item.timestamp.toDate().toLocaleString() : 'Unknown'}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNotification(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.notificationList}
      />

      <BottomNavBar navigation={navigation} activeScreen="NotificationScreenEditor" />
    </View>
  );
};

export default NotificationScreenEditor;

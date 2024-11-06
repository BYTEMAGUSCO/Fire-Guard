import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Image, FlatList, ImageBackground } from 'react-native';
import { db } from '../firebase';
import BottomNavBar from '../components/BottomNavBarUsers';
import styles from '../styles/HomeStyles';
import { doc, setDoc, getDocs, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const HomeScreenUsers = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [alarmStatus, setAlarmStatus] = useState(false); // Track if the alarm is on or off

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, 'disasterPreparednessPosts'));
      const postList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    };

    const unsubscribe = onSnapshot(collection(db, 'disasterPreparednessPosts'), (snapshot) => {
      const postList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    });

    fetchPosts();
    return () => unsubscribe();
  }, []);

  // Function to send the POST request to your Flask API
  const sendCommandToBackend = async (value) => {
    try {
      const response = await fetch('https://unendingcalamity.pythonanywhere.com/api/command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Command received!`);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error sending command:', error);
      Alert.alert('Error', 'There was an error sending the command.');
    }
  };

  // Function to toggle alarm state and send appropriate command
  const toggleAlarm = () => {
    const newAlarmStatus = !alarmStatus; // Toggle the alarm status
    setAlarmStatus(newAlarmStatus); // Update the alarm state
    sendCommandToBackend(newAlarmStatus ? 1 : 0); // Send 1 if alarm is on, 0 if off
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  const renderPost = ({ item: post }) => (
    <TouchableOpacity key={post.id} onPress={() => handlePostPress(post)} style={styles.postContainer}>
      {post.thumbnail && <Image source={{ uri: post.thumbnail }} style={styles.thumbnail} />}
      <Text style={styles.postTitle}>{post.title}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ImageBackground
        source={require('../assets/bg.png')} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          resizeMode: 'cover',
        }}
      />
      <View style={{ padding: 10 }}>
        <View style={{ marginBottom: 0 }}>
          <Image source={require('../assets/all2.png')} style={{ width: '100%', height: 220, resizeMode: 'contain' }} />
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={<Text style={styles.title}>CALAMITY PREPAREDNESS:</Text>}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      {/* Fire Alarm Toggle Button */}
      <TouchableOpacity
        style={{
          backgroundColor: alarmStatus ? 'red' : 'green', // Green when off, Red when on
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 60,
        }}
        onPress={toggleAlarm}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {alarmStatus ? 'TURN OFF FIRE ALARM' : 'TURN ON FIRE ALARM'}
        </Text>
      </TouchableOpacity>

      <BottomNavBar navigation={navigation} activeScreen="HomeScreenUsers" />
    </KeyboardAvoidingView>
  );
};

export default HomeScreenUsers;

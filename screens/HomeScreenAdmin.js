import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { db } from '../firebase';
import BottomNavBar from '../components/BottomNavBarAdmin';
import styles from '../styles/AdminScreenStyles';
import { doc, setDoc, getDocs, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ImageBackground } from 'react-native';

const HomeScreenAdmin = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [alarmStatus, setAlarmStatus] = useState(false); // Track if the alarm is on or off
  const [formVisible, setFormVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    header1: '',
    header2: '',
    body: '',
    image: null,
    thumbnail: null,
    sections: [{ header: '', content: '', sectionImage: null }] 
  });

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

  const handleRemovePost = async (id) => {
    Alert.alert(
      "Remove Post",
      "Are you sure you want to remove this post?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => {
          await deleteDoc(doc(db, 'disasterPreparednessPosts', id));
        }},
      ]
    );
  };

  const convertImageToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    return `data:image/jpeg;base64,${base64}`;
  };

  const handleImagePicker = async (isThumbnail = false) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64Image = await convertImageToBase64(result.assets[0].uri);
      const fieldKey = isThumbnail ? 'thumbnail' : 'image';
      setNewPost(prev => ({ ...prev, [fieldKey]: base64Image }));
    }
  };
   // Function to toggle alarm state and send appropriate command
   const toggleAlarm = () => {
    const newAlarmStatus = !alarmStatus; // Toggle the alarm status
    setAlarmStatus(newAlarmStatus); // Update the alarm state
    sendCommandToBackend(newAlarmStatus ? 1 : 0); // Send 1 if alarm is on, 0 if off
  };

  const handleSectionImagePicker = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64Image = await convertImageToBase64(result.assets[0].uri);
      const updatedSections = newPost.sections.map((section, i) => {
        if (i === index) {
          return { ...section, sectionImage: base64Image };
        }
        return section;
      });
      setNewPost(prev => ({ ...prev, sections: updatedSections }));
    }
  };

  const handlePost = async () => {
    try {
      const docRef = doc(collection(db, 'disasterPreparednessPosts'));
      await setDoc(docRef, {
        ...newPost,
        postID: posts.length + 1,
        section: 1
      });

      setNewPost({ title: '', header1: '', header2: '', body: '', image: null, thumbnail: null, sections: [{ header: '', content: '', sectionImage: null }] });
      setFormVisible(false);
      Alert.alert('Posted', 'Your post has been added.');
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      Alert.alert('Error Posting', error.message);
    }
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    if (formVisible) {
      setNewPost({ title: '', header1: '', header2: '', body: '', image: null, thumbnail: null, sections: [{ header: '', content: '', sectionImage: null }] });
    }
  };

  const addSection = () => {
    setNewPost(prev => ({ ...prev, sections: [...prev.sections, { header: '', content: '', sectionImage: null }] }));
  };

  const updateSection = (index, field, value) => {
    const updatedSections = newPost.sections.map((section, i) => {
      if (i === index) {
        return { ...section, [field]: value };
      }
      return section;
    });
    setNewPost(prev => ({ ...prev, sections: updatedSections }));
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
      <View style={styles.header}>
        
        <Text style={styles.title}>Home Screen Editor</Text>
        <TouchableOpacity onPress={toggleFormVisibility} style={styles.plusButton}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {!formVisible && posts.map((post) => (
          <TouchableOpacity key={post.id} onPress={() => handlePostPress(post)} style={styles.postContainer}>
            {post.thumbnail && (
              <Image source={{ uri: post.thumbnail }} style={styles.thumbnail} />
            )}
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDate}>{new Date().toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => handleRemovePost(post.id)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {formVisible && (
          <View style={styles.fieldContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title (required)"
              value={newPost.title}
              onChangeText={text => setNewPost(prev => ({ ...prev, title: text }))} 
            />
            <TouchableOpacity onPress={() => handleImagePicker(true)} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerText}>Pick Thumbnail Image</Text>
            </TouchableOpacity>
            {newPost.thumbnail && <Text>Thumbnail Image Selected</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Header 1"
              value={newPost.header1}
              onChangeText={text => setNewPost(prev => ({ ...prev, header1: text }))} 
            />
            <TextInput
              style={styles.input}
              placeholder="Header 2"
              value={newPost.header2}
              onChangeText={text => setNewPost(prev => ({ ...prev, header2: text }))} 
            />
            <TextInput
              style={styles.textArea}
              placeholder="Body"
              multiline
              value={newPost.body}
              onChangeText={text => setNewPost(prev => ({ ...prev, body: text }))} 
            />
            <TouchableOpacity onPress={() => handleImagePicker()} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerText}>Pick Main Image</Text>
            </TouchableOpacity>
            {newPost.image && <Text>Main Image Selected</Text>}

            {newPost.sections.map((section, index) => (
              <View key={index} style={styles.sectionContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Section Header"
                  value={section.header}
                  onChangeText={text => updateSection(index, 'header', text)}
                />
                <TextInput
                  style={styles.textArea}
                  placeholder="Section Content"
                  multiline
                  value={section.content}
                  onChangeText={text => updateSection(index, 'content', text)}
                />
                <TouchableOpacity onPress={() => handleSectionImagePicker(index)} style={styles.imagePickerButton}>
                  <Text style={styles.imagePickerText}>Pick Section Image</Text>
                </TouchableOpacity>
                {section.sectionImage && <Text>Section Image Selected</Text>}
              </View>
            ))}
            <TouchableOpacity onPress={addSection} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Section</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendButton} onPress={handlePost}>
              <Icon name="paper-plane" size={20} color="#fff" style={{ marginRight: 5 }} />
              <Text style={styles.sendButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
         
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


      <BottomNavBar navigation={navigation} activeScreen="HomeScreenAdmin" />
    </KeyboardAvoidingView>
  );
};

export default HomeScreenAdmin;

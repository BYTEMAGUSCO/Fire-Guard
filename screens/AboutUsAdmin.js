import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import BottomNavBar from '../components/BottomNavBarAdmin';
import styles from '../styles/AboutUsStyles';


const AboutUsAdmin = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Logged Out', 'You have successfully logged out.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch(error => Alert.alert('Logout Failed', error.message));
  };

  return (
    
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage} />
      
      <Text style={styles.title}>About Us</Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.welcomeText}>
          Welcome to the Calamity Responder App
        </Text>
        <Text style={styles.aboutText}>
          We are committed to providing emergency and crisis support to the Eulogio "Amang" Rodriguez Institute of Science and Technology-Cavite Campus. By instantly connecting individuals in need with volunteers, emergency personnel, and vital resources, we strive to empower the school. Calamity Responder is here to make sure you get the assistance you require in times of calamity.
        </Text>

        <Text style={styles.missionText}>
          Our Mission
        </Text>
        <Text style={styles.aboutText}>
          At Calamity Responder, giving everyone the resources they need is our goal. While cultivating a supportive and cooperative culture, we aim to improve calamity preparedness, response, and recovery actions.
        </Text>

        <Text style={styles.sectionHeader}>Key Features:</Text>
        <Text style={styles.aboutText}>
          - <Text style={styles.boldText}>Emergency Alerts:</Text> Receive updates about ongoing disasters in the area.{"\n"}
          - <Text style={styles.boldText}>Emergency Hotlines:</Text> Connect with trained responders and local volunteers.{"\n"}
          - <Text style={styles.boldText}>Safety Tools/Guidelines:</Text> Access emergency first aid instructions and survival tips.{"\n"}
          - <Text style={styles.boldText}>Resource Mapping:</Text> Locate nearby evacuation areas and other resources.{"\n"}
          - <Text style={styles.boldText}>Alarm Functionality:</Text> Instantly send distress signals within the area.{"\n"}
        </Text>

        <Text style={styles.aboutText}>
          We are committed to making a difference, helping communities prepare for, respond to, and recover from calamities. Join us in building a safer future for everyone.
        </Text>

        <Text style={styles.sectionHeader}>Contact Us</Text>
        <Text style={styles.aboutText}>
          We value your feedback and are here to assist you. If you have any questions, need support, or have suggestions:
        </Text>

        <Text style={styles.aboutText}>
          <Text style={styles.boldText}>Support Team:</Text> For technical support or assistance with the app:{"\n"}
          <Text style={styles.boldText}>Email:</Text> calamity.responder.ecc@gmail.com{"\n"}
          <Text style={styles.boldText}>Phone:</Text> +63 993 6585 305{"\n"}
        </Text>

        <Text style={styles.aboutText}>
          <Text style={styles.boldText}>Address:</Text> Blk. 3 Lot 2, 5 Congressional Rd,{"\n"}
          General Mariano Alvarez, Cavite,{"\n"}
          Philippines, Zip code 4117
        </Text>

        <Text style={[styles.aboutText, { marginTop: 10 }]}>
          Thank you for being a part of the Calamity Responder community. Together, we can make a difference in times of calamity.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.sendButton} onPress={handleLogout}>
        <Text style={styles.sendButtonText}>Logout</Text>
      </TouchableOpacity>

      <BottomNavBar navigation={navigation} activeScreen="AboutUsAdmin" />
    </View>
  );
};

export default AboutUsAdmin;

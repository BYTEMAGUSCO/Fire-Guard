// screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ImageBackground, Image } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/LoginScreenStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(true); // Set default to true
  const navigation = useNavigation();

  useEffect(() => {
    // Load saved email and password on component mount
    const loadCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) setPassword(savedPassword);
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Pass the user role to the next screen
        const userRole = userData.role;
        if (userRole === "admin") {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreenAdmin", params: { userRole } }] // Pass userRole as a parameter
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreenUsers", params: { userRole } }] // Pass userRole as a parameter
          });
        }

        // Save credentials if the user opts to
        if (savePassword) {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
        } else {
          // Clear saved credentials if not saving
          await AsyncStorage.removeItem('email');
          await AsyncStorage.removeItem('password');
        }
      } else {
        Alert.alert("Error", "User role not found");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
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
      {/* Replace title text with the CALAMITY image */}
      <Image
        source={require('../assets/CALAMITY.png')} // Ensure the path to your image is correct
        style={styles.appTitle} // Apply styles if needed
      />
      
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Save Password</Text>
        <Switch
          value={savePassword}
          onValueChange={setSavePassword}
          trackColor={{ false: "#767577", true: "#ff0000" }} // Red when toggled on
          thumbColor={savePassword ? "#ff0000" : "#f4f3f4"} // Red thumb color
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkButtonText}>Don't Have an Account? Register Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

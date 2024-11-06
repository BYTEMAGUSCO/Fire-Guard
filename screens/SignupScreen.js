// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { setDoc, doc } from "firebase/firestore";
import styles from '../styles/SignupScreenStyles';
import { ImageBackground } from 'react-native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user"
      });

      Alert.alert("Sign Up Successful", `Welcome, ${user.email}`);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Sign Up Failed", error.message);
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
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkButtonText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

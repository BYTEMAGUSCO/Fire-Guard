import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../styles/BottomNavBarStyles';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const BottomNavBarAdmin = ({ navigation, activeScreen }) => {
  // State to track which icon is being pressed
  const [pressedIcon, setPressedIcon] = useState(null);

  // Function to handle the press in event
  const handlePressIn = (iconName) => {
    setPressedIcon(iconName);
  };

  // Function to handle the press out event
  const handlePressOut = () => {
    setPressedIcon(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('HomeScreenAdmin')}
        onPressIn={() => handlePressIn('home')}
        onPressOut={handlePressOut}
      >
        <Icon name="home" size={30} color={pressedIcon === 'home' || activeScreen === 'HomeScreenAdmin' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Maps')}
        onPressIn={() => handlePressIn('map')}
        onPressOut={handlePressOut}
      >
        <Icon name="map" size={30} color={pressedIcon === 'map' || activeScreen === 'Maps' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('WeatherForecastAdmin')}
        onPressIn={() => handlePressIn('cloud')}
        onPressOut={handlePressOut}
      >
        <Icon name="cloud" size={30} color={pressedIcon === 'cloud' || activeScreen === 'WeatherForecastAdmin' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('NotificationScreenEditor')}
        onPressIn={() => handlePressIn('notifications')}
        onPressOut={handlePressOut}
      >
        <Icon name="notifications" size={30} color={pressedIcon === 'notifications' || activeScreen === 'NotificationScreenEditor' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('ContactScreenEditor')}
        onPressIn={() => handlePressIn('people')}
        onPressOut={handlePressOut}
      >
        <Icon name="people" size={30} color={pressedIcon === 'people' || activeScreen === 'ContactScreenEditor' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('AboutUsAdmin')}
        onPressIn={() => handlePressIn('information-circle')}
        onPressOut={handlePressOut}
      >
        <Icon name="information-circle" size={30} color={pressedIcon === 'information-circle' || activeScreen === 'AboutUsAdmin' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBarAdmin;

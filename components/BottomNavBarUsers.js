import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../styles/BottomNavBarStyles';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const BottomNavBarAdmin = ({ navigation, activeScreen }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreenUsers')}>
        <Icon name="home" size={30} color={activeScreen === 'HomeScreenUsers' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Maps')}>
        <Icon name="map" size={30} color={activeScreen === 'Maps' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('WeatherForecastUser')}>
        <Icon name="cloud" size={30} color={activeScreen === 'WeatherForecastUser' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('NotificationScreenUser')}>
        <Icon name="notifications" size={30} color={activeScreen === 'NotificationScreenUser' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ContactScreenUser')}>
        <Icon name="people" size={30} color={activeScreen === 'ContactScreenUser' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AboutUsUser')}>
        <Icon name="information-circle" size={30} color={activeScreen === 'AboutUsUser' ? '#ffff00' : '#ffffff'} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBarAdmin;

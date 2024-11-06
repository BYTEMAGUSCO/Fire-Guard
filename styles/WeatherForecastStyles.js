// styles/AdminScreenStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width for responsive design

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    paddingBottom:60,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  weatherContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 15,
    minHeight:280,
  },
  currentWeatherContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  locationText: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    fontWeight: 'bold',
  },
  cityLocationText: {
    fontSize: width * 0.045, // Smaller font size for other cities
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: width * 0.2, // Adjust icon size based on screen width
    height: width * 0.2, // Maintain aspect ratio
    marginVertical: 10,
  },
  temperatureText: {
    fontSize: width * 0.1, // Adjust font size based on screen width
    fontWeight: 'bold',
    color: '#ff5722',
  },
  conditionText: {
    fontSize: width * 0.045, // Adjust font size based on screen width
    fontStyle: 'italic',
  },
  feelsLikeText: {
    fontSize: width * 0.04, // Adjust font size based on screen width
    color: '#666',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#ff4d4d',
  },
});

export default styles;

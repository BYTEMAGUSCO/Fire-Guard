import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView,} from 'react-native';
import BottomNavBar from '../components/BottomNavBarUsers';
import styles from '../styles/WeatherForecastStyles';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';

// Import SVGs for weather conditions
import ClearDay from '../assets/clear-day.svg';
import ClearNight from '../assets/clear-night.svg';
import Cloudy from '../assets/cloudy.svg';
import Drizzle from '../assets/drizzle.svg';
import Fog from '../assets/fog.svg';
import Hail from '../assets/hail.svg';
import PartlyCloudyDay from '../assets/partly-cloudy-day.svg';
import PartlyCloudyNight from '../assets/partly-cloudy-night.svg';
import PartlyCloudyDayRain from '../assets/partly-cloudy-day-rain.svg';
import PartlyCloudyNightRain from '../assets/partly-cloudy-night-rain.svg';
import Rain from '../assets/rain.svg';
import Sleet from '../assets/sleet.svg';
import Snow from '../assets/snow.svg';
import Thunderstorm from '../assets/thunderstorm.svg';
import Tornado from '../assets/tornado.svg';
import Wind from '../assets/wind.svg';

const WeatherForecastUser = ({ navigation }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cityWeather, setCityWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activity, setActivity] = useState('');
  const [tipsCache, setTipsCache] = useState({});

  const citiesInCavite = [
    'Bacoor', 'Cavite City', 'Dasmariñas', 'Imus', 'Gen. Trias',
    'Tanza', 'Silang', 'Naic', 'Indang', 'Amadeo', 
    'Mendez', 'Trece Martires', 'Tagaytay'
  ];

  useEffect(() => {
    const fetchData = async () => {
      const cachedCurrentWeather = await AsyncStorage.getItem('currentWeather');
      const cachedCityWeather = await AsyncStorage.getItem('cityWeather');

      if (cachedCurrentWeather && cachedCityWeather) {
        setCurrentWeather(JSON.parse(cachedCurrentWeather));
        setCityWeather(JSON.parse(cachedCityWeather));
        setLoading(false);
      } else {
        await fetchWeather();
        await fetchCityWeather();
      }
    };

    fetchData();
  }, []);

  const fetchWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    try {
      const apiKey = '2f32bdb5fb58433f8f1121809243110';
      const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`);
      setCurrentWeather(weatherResponse.data);

      const currentCondition = weatherResponse.data.current.condition.text;
      await generateWeatherActivity(currentCondition);

      await AsyncStorage.setItem('currentWeather', JSON.stringify(weatherResponse.data));
    } catch (err) {
      setError('Error fetching current location weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCityWeather = async () => {
    const apiKey = '2f32bdb5fb58433f8f1121809243110';
    const weatherPromises = citiesInCavite.map(async (city) => {
      try {
        const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        return weatherResponse.data;
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        return null;
      }
    });

    const results = await Promise.all(weatherPromises);
    setCityWeather(results.filter(Boolean));

    await AsyncStorage.setItem('cityWeather', JSON.stringify(results.filter(Boolean)));
  };

  const generateWeatherActivity = async (weatherCondition) => {
    if (tipsCache[weatherCondition]) {
      setActivity(tipsCache[weatherCondition]);
      return;
    }

    const apiToken = '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';
    const prompt = `The weather is ${weatherCondition}. How can we be safe in a sentence`;
    const model = 'mistralai/Mistral-Nemo-Instruct-2407';

    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          inputs: prompt,
          parameters: {
            max_length: 500,
            num_return_sequences: 1,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
          },
        }
      );

      if (response.status === 200) {
        const generatedText = response.data[0]?.generated_text || "No tip generated.";
        const trimmedText = trimToThreeSentences(generatedText.trim());
        setActivity(trimmedText);
        setTipsCache(prevCache => ({
          ...prevCache,
          [weatherCondition]: trimmedText,
        }));
      }
    } catch (error) {
      console.error('Error generating activity:', error);
      setActivity('Unable to generate a tip at the moment.');
    }
  };

  const trimToThreeSentences = (text) => {
    const sentences = text.split('.').filter(sentence => sentence.trim() !== '');
    return sentences.slice(2, 5).join('. ') + (sentences.length > 5 ? '.' : '');
  };

  const renderWeatherData = (weatherData) => {
    const weatherCondition = weatherData?.current?.condition?.text || 'N/A';

    // Map weather condition to SVG component
    const WeatherIconComponent = {
      'Clear': <ClearDay width={80} height={80} />,
      'Sunny': <ClearDay width={80} height={80} />,
      'Clear Night': <ClearNight width={80} height={80} />,
      'Cloudy': <Cloudy width={80} height={80} />,
      'Drizzle': <Drizzle width={80} height={80} />,
      'Fog': <Fog width={80} height={80} />,
      'Hail': <Hail width={80} height={80} />,
      'Partly cloudy': <PartlyCloudyDay width={80} height={80} />,
      'Partly cloudy night': <PartlyCloudyNight width={80} height={80} />,
      'Rain': <Rain width={80} height={80} />,
      'Sleet': <Sleet width={80} height={80} />,
      'Snow': <Snow width={80} height={80} />,
      'Thunderstorm': <Thunderstorm width={80} height={80} />,
      'Tornado': <Tornado width={80} height={80} />,
      'Wind': <Wind width={80} height={80} />,
    }[weatherCondition] || <Cloudy width={80} height={80} />;

    return (
      <View key={weatherData.location.name} style={styles.weatherContainer}>
        <Text style={styles.locationText}>{weatherData.location.name}</Text>
        {WeatherIconComponent}
        <Text style={styles.temperatureText}>{weatherData.current?.temp_c} °C</Text>
        <Text style={styles.conditionText}>{weatherCondition}</Text>
        <Text style={styles.feelsLikeText}>Feels like: {weatherData.current?.feelslike_c} °C</Text>
        {weatherData.location.name === currentWeather?.location?.name && (
          <Text style={styles.tipsText}>{activity || 'No activity available.'}</Text>
        )}
      </View>
    );
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Weather Dashboard</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.placeholderText}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {currentWeather && renderWeatherData(currentWeather)}

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {cityWeather.map((weatherData) => (
                <View key={weatherData.location.name} style={{ width: '48%', marginBottom: 10 }}>
                  {renderWeatherData(weatherData)}
                </View>
              ))}
            </View>
          </ScrollView>
        )}

       
      </View>
      <BottomNavBar navigation={navigation} activeScreen="WeatherForecastUser" />
    </View>
  );
};

export default WeatherForecastUser;

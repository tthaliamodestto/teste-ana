import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

import * as Location from 'expo-location';

export default function LocationScreen() {
  
  //estado para armazenar a localização e coordenadas
  const [location, setLocation] = useState(null);

  //estado para controlar a mensagem de erro ou status da permissão
  const [errorMsg, setErrorMsg] = useState(null);
  
  //
  const [loading, setLoading] = useState(false);


  const fetchCurrentLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status =! 'granted') {
      setErrorMsg('Permissão para acessar a localização foi negada');
    }

    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation(currentLocation);
    setLoading(false);


    
   return (

    <View style={styles.container}>

      <Text style={styles.headerTitle}>Rastreamento GPS</Text>

      <TouchableOpacity style={styles.fetchButton} onPress={fetchCurrentLocation}>

        <Text style={styles.buttonText}>Capturar Coordenadas</Text>
      
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff"  style={{marginTop: 20}}/>}

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {location && (

          <View style={styles.card}>

            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>{location.coords.latitude}</Text>

            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>{location.coords.longitude}</Text>

            <Text style={styles.label}>Precisão:</Text>
            <Text style={styles.value}>{location.coords.accuracy}</Text>

          </View>

      )}

    
    
    </View>
   )


  }
}
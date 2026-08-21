import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';

import CameraViewModal from '../components/CameraViewModal';
import PhotoOverlay from '../components/PhotoOverlay';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [photoUri, setPhotoUri] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const fetchCurrentLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão de localização foi negada.');
        setLoading(false);
        return false;
      }

      let isGpsEnabled = await Location.hasServicesEnabledAsync();
      if (!isGpsEnabled) {
        setErrorMsg('O serviço de GPS está desativado no seu dispositivo.');
        setLoading(false);
        return false;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);
      return true;
    } catch (error) {
      setErrorMsg('Erro ao buscar localização: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCamera = async () => {
    if (!location) {
      const success = await fetchCurrentLocation();
      if (!success) return;
    }
    setIsCameraVisible(true);
  };

  const handlePhotoCaptured = (uri) => {
    setPhotoUri(uri);
    setIsCameraVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Geolocalização & Câmera</Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.fetchButton}
          onPress={fetchCurrentLocation}
          disabled={loading}
        >
          <Text style={styles.buttonText}>1. Obter Localização</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.cameraButton,
            !location && styles.disabledButton,
          ]}
          onPress={handleOpenCamera}
          disabled={loading}
        >
          <Text style={styles.buttonText}>2. Tirar Foto do Local</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 15 }} />}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {photoUri && (
        <PhotoOverlay
          photoUri={photoUri}
          location={location}
          onRetake={handleOpenCamera}
        />
      )}

      <CameraViewModal
        visible={isCameraVisible}
        onClose={() => setIsCameraVisible(false)}
        onTakePicture={handlePhotoCaptured}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  actionContainer: {
    width: '100%',
    gap: 10,
  },
  fetchButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});
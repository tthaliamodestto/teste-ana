import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default function PhotoOverlay({ photoUri, location, onRetake }) {
  if (!photoUri) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />
      
      <View style={styles.overlay}>
        <Text style={styles.overlayTitle}>📍 Localização do Registro</Text>
        {location ? (
          <>
            <Text style={styles.overlayText}>
              Lat: {location.coords.latitude.toFixed(6)}
            </Text>
            <Text style={styles.overlayText}>
              Long: {location.coords.longitude.toFixed(6)}
            </Text>
            <Text style={styles.overlaySubtext}>
              Precisão: {location.coords.accuracy.toFixed(1)}m
            </Text>
          </>
        ) : (
          <Text style={styles.overlayText}>Coordenadas não disponíveis</Text>
        )}
      </View>

      <TouchableOpacity style={styles.retakeButton} onPress={onRetake}>
        <Text style={styles.buttonText}>Tirar Outra Foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 380,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 15,
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
},
  overlayTitle: { color: '#FFD700', fontWeight: 'bold', marginBottom: 4 },
  overlayText: { color: '#FFFFFF', fontSize: 13, fontWeight: '500' },
  overlaySubtext: { color: '#CCCCCC', fontSize: 11, marginTop: 2 },
  retakeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
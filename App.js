import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from  'react-native';
import {CameraView, useCameraPermissions} from 'expo-camera';

export default function CameraScreen(){
    //hook do Expo para verificar e pedir permissão acesso à câmera
    const [permission, requestPermission] = useCameraPermissions();
    //Estado para armazenar a foto tirada (URI da imagem salva temporariamente)
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    //Referência para o componentes CameraView para acionar a captura de foto
    const cameraRef = useRef(null);

    //Se o estado da permissão ainda está carregando
    if (!permission){
        return <View/>
    }
    //Se a permissão não for concedida pelo usuário
    if (!permission.granted){
        return(
            <View style={styles.permissaoContainer}>
                <Text>Precisamos da sua permissão para abrir a câmera</Text>
                <TouchableOpacity style={styles.permissionButton} 
                onPress={requestPermission}>
                    <Text style={styles.buttonText}>Conceder Permissão</Text>
                </TouchableOpacity>
            </View>
        );
    }
    //Função para capturar fotografia
    const takePicture = async () => {
        if (cameraRef.current){
        //Executa o método de captura e retorna um objeto
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedPhoto(photo.uri);
        }
    };

    return(
        <View style={styles.container}>
            {capturedPhoto ? (
                <View style={styles.previewContainer}>
                   <Image source={{uri: capturedPhoto}} style={styles.previewImage}/>
                   <TouchableOpacity style={styles.retryButton} onPress={() => setCapturedPhoto(null)}>
                    <Text>Tirar Outra Foto</Text>
                   </TouchableOpacity>
                </View>

            ) : (
                <CameraView style={styles.camera} ref={cameraRef} facing="back">
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <View style={styles.captureInnerCircle}/>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
            </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  permissionButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  actionContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  retryButton: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
// CameraScreen.js

import React, { useState, useRef } from 'react';
import { View, Image, Button, Modal, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  
  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setImage(uri);
      setShowModal(true);
      
    }
  };

  const confirmAndUpload = () => {
    if (image) {
      // Implement your upload logic here
      navigation.navigate('Results', { confirmedImage: image });
      setShowModal(false);
    }
  };

  const toggleCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}
        >
          <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }} onPress={toggleCamera}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Toggle Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'flex-end', alignItems: 'center' }} onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal animationType="slide" transparent={false} visible={showModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button title="Confirm and Upload" onPress={confirmAndUpload} />
        </View>
      </Modal>
     
    </View>
  );
};

export default CameraScreen;

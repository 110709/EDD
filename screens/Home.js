// HomeScreen.js

import React, { useState } from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const navigateToResultScreen = () => {
    if (selectedImage) {
      navigation.navigate('Result', { imageUri: selectedImage });
    } else {
      alert('Please select an image first.');
    }
  };

  return (
    <ImageBackground
      source={require('background.jpg')} // Change the path accordingly
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Select an image from your gallery, and we'll provide predictions for you!
        </Text>

        <View style={styles.imageContainer}>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        </View>

        <Button title="Pick Image" onPress={pickImage} />

        <Button
          title="Get Predictions"
          onPress={navigateToResultScreen}
          disabled={!selectedImage}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  instructions: {
    marginBottom: 20,
    textAlign: 'center',
    color: 'white', // Set text color to be visible on the background
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default HomeScreen;


// ResultScreen.js

import React, { useState } from 'react';
import { View, Image, Text, Button, ActivityIndicator } from 'react-native';

const ResultScreen = ({ route }) => {
  const { imageUri } = route.params;
  const [predictedImage, setPredictedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const roboflowApiEndpoint = 'https://detect.roboflow.com/eye-disease-svz00/6?api_key=nQX4ydDXat1Mq7dNBHsz';

  const getPredictionsFromRoboflow = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await fetch(roboflowApiEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();

      // Assuming the Roboflow API response has a 'output_url' field
      setPredictedImage(data.output_url);
    } catch (error) {
      console.error('Error predicting from Roboflow:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {/* Display the selected image */}
      <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />

      {/* Button to request predictions */}
      <Button
        title="Request Prediction"
        onPress={getPredictionsFromRoboflow}
        disabled={loading}
      />

      {/* Display the predicted image or loading indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {predictedImage && (
        <View>
          <Text>Predicted Image:</Text>
          <Image source={{ uri: predictedImage }} style={{ width: 200, height: 200 }} />
        </View>
      )}
    </View>
  );
};

export default ResultScreen;

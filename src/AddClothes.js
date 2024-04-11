import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddClothes = ({ navigation, onConfirm, existingClothes }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChoosePhotoFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Kamera izni reddedildi!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPreviewImage(result.uri);
      showConfirmationAlert();
    }
  };

  const handleChoosePhotoFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Galeri izni reddedildi!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPreviewImage(result.uri);
      showConfirmationAlert();
    }
  };

  const showConfirmationAlert = () => {
    Alert.alert(
      'Onay',
      'Kıyafeti eklemek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        { text: 'Evet', onPress: handleConfirm },
      ],
      { cancelable: false }
    );
  };

  const handleConfirm = () => {
    if (previewImage) {
      if (existingClothes.includes(previewImage)) {
        Alert.alert('Başarılı', 'Fotoğraf başarıyla eklendi!');
      } else {
        Alert.alert('Başarısız', 'Fotoğraf eklenemedi!');
      }
      onConfirm(previewImage);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleChoosePhotoFromCamera}>
        <Text style={styles.buttonText}>Kamera ile Kıyafet Seç</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChoosePhotoFromGallery}>
        <Text style={styles.buttonText}>Galeriden Kıyafet Seç</Text>
      </TouchableOpacity>
      {previewImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: previewImage }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default AddClothes;

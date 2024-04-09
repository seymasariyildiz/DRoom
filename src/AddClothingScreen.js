import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert, BackHandler, FlatList, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddClothingScreen = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const imagePath = 'C:\\Users\\User\\Desktop\\droom\\OIG4.PuWLuPU.jpg'; // Lokaldeki bir fotoğrafın yolu

  useEffect(() => {
    const backAction = () => {
      if (image !== null) {
        Alert.alert('Lütfen önce resmi onaylayın veya iptal edin.');
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [image]);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Kamera izni gerekiyor.');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();

    if (!pickerResult.cancelled) {
      const newImageUri = pickerResult.uri;
      setImages([...images, newImageUri]);
      setImage(newImageUri);
    }
  };

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Galeri izni gerekiyor.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      const newImageUri = pickerResult.uri;
      setImages([...images, newImageUri]);
      setImage(newImageUri);
    }
  };

  const handleConfirm = () => {
    Alert.alert('Kıyafet başarıyla eklendi!');
    setImages([]);
    setImage(null);
  };

  const exitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Kamera Aç" onPress={openCamera} />
        <Button title="Galeriden Ekle" onPress={openImagePicker} />
        <Button title="Uygulamadan Çık" onPress={exitApp} />
      </View>
      <View style={styles.imagesContainer}>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <View style={styles.imageItem}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {image !== null && (
          <View style={styles.confirmContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Button title="Kıyafeti Onayla" onPress={handleConfirm} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Arka plan rengi
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  imagesContainer: {
    flex: 1,
  },
  imageItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  confirmContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AddClothingScreen;

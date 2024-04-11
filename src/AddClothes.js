import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, withNavigation } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const AddClothes = ({ onConfirm, onBack, navigation }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

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
      setConfirmModalVisible(true);
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
      setConfirmModalVisible(true);
    }
  };

  const handleConfirm = () => {
    if (previewImage) {
      onConfirm(previewImage);
      setPreviewImage(null);
      setConfirmModalVisible(false);
      Alert.alert('Başarılı', 'Kıyafet başarıyla eklendi!');
    } else {
      setConfirmModalVisible(false); // Modal penceresini kapat
      Alert.alert('Hata', 'Önce bir kıyafet seçmelisiniz!');
    }
  };

  const handleCloseModal = () => {
    setConfirmModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kıyafet Ekle</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Kıyafeti eklemek istiyor musunuz?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{ ...styles.modalButton, backgroundColor: 'green' }}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Evet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.modalButton, backgroundColor: 'red' }}
                onPress={handleCloseModal}
              >
                <Text style={styles.buttonText}>Hayır</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
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
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
});

export default AddClothes;

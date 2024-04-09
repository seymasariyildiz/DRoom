import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Geri butonu için Ionicons kullanıyoruz

const Gardrop = ({ navigation }) => { // navigation prop'unu alıyoruz
  const [clothes, setClothes] = useState([]); // Kıyafetleri saklayacak state
  const [selectedClothes, setSelectedClothes] = useState([]); // Seçilen kıyafetleri saklayacak state

  // Kıyafet seçme fonksiyonu
  const selectClothes = (item) => {
    if (selectedClothes.includes(item)) {
      // Eğer kıyafet zaten seçiliyse, seçimden kaldır
      setSelectedClothes(selectedClothes.filter((clothing) => clothing !== item));
    } else {
      // Değilse, seç
      setSelectedClothes([...selectedClothes, item]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}> {/* Geri butonu */}
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Gardrop</Text> {/* Gardrop yazısı */}
      </View>
      {/* Kıyafetlerin listeleneceği FlatList */}
      <FlatList
        data={clothes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectClothes(item)}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.tag}</Text> {/* Kıyafet etiketi */}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />

      {/* Kombin yap butonu (sadece çoklu kıyafet seçimi yapıldığında aktif hale gelir) */}
      {selectedClothes.length > 1 && (
        <TouchableOpacity onPress={() => {}}>
          <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}>
            <Text style={{ color: 'white' }}>Kombin Yap</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Gardrop;

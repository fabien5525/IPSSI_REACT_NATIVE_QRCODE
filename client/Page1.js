import React, { useEffect, useState } from 'react';
import { StyleSheet,View, Text, Image, FlatList,Button } from 'react-native';

const Api = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const renderProduct = ({ item }) => (
    <View key={item.id} style={styles2.card}>
      <Text>{item.title}</Text>
      <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }}resizeMode="contain" />
      <Button title={item.price.toString()} style={styles2.addButton}/>
    </View>
  );

  return (
    <View>
      <Text>Liste des produits :</Text>
      <FlatList
        data={data}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles2 = StyleSheet.create({
    card: {
      backgroundColor: '#F0F0F0',
      padding: 10,
      marginEnd:8,
      marginStart:8,
      borderRadius: 5,
      marginBottom: 10,
    },

    addButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 55,
        justifyContent: 'center',
      },

  });

export default Api;

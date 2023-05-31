import React, { useEffect, useState } from 'react';
import { StyleSheet,View, Text, FlatList } from 'react-native';

const Api = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://5525.fr:19001/user')
      .then((response) => response.json())
      .then((json) => setUserData(json))
      .catch((error) => console.error(error));
  }, []);

  const renderProduct = ({ item , index}) => (
    <View style={styles2.card}>
      {item ? (
        <View key={index}>
          <Text>Name: {`${item.name.first} ${item.name.last}`}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Location: {`${item.location.street.name}, ${item.location.city}`}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );

  return (
    <View>
      <Text>Liste des produits :</Text>
      <FlatList
        data={userData}
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

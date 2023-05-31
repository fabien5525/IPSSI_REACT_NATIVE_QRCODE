import React, { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, Pressable,Modal,Button } from 'react-native';

const Api = () => {
  const [userData, setUserData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('http://5525.fr:19001/user')
      .then((response) => response.json())
      .then((json) => setUserData(json))
      .catch((error) => console.error(error));
  }, []);

  const renderProduct = ({ item, index }) => (
    <Pressable key={index} onPress={() => setModalVisible(true)}>
      <View
        key={index}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: item.picture.thumbnail }}
          alt={item.titre}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 10,
          }}
        />
        <View style={{
          flex: 1,
          height: 50,
        }}>
          <Text style={{
            flex: 1,
            flexWrap: "wrap",
            marginRight: 10,
            textAlign: "left",

          }}>{item.name.first} {item.name.last}</Text>
          <Text style={{
            flex: 1,
            flexWrap: "wrap",
            marginRight: 10,
          }}>{item.email}</Text>
        </View>

        <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {item && (
              <View>
                <Text>Nom: {item.name.first} {item.name.last}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Ville: {item.location.city}</Text>
                <Text>Pays: {item.location.country}</Text>
                <Button title="Fermer" onPress={() => setModalVisible(false)} />
              </View>
            )}
          </View>
        </Modal>

      </View>
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={userData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Api;

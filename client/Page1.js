import React, { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, Pressable, Modal, Button } from 'react-native';

const Api = () => {
  const [userData, setUserData] = useState([]);
  const [itemModal, setItemModal] = useState(null);

  useEffect(() => {
    fetch('http://192.168.194.168:19001/user')
      .then((response) => response.json())
      .then((json) => setUserData(json))
      .catch((error) => console.error(error));
  }, []);

  const renderProduct = ({ index, item }) => {
    return (
      <View key={index}>
        <Pressable onPress={() => setItemModal(item)}>
          <View
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
              alt={item.email}
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
          </View>
        </Pressable>
      </View>
    )
  };

  return (
    <View>
      <Modal
        visible={itemModal ? true : false}
        animationType="slide"
        onRequestClose={() => setItemModal(null)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {itemModal && (
            <View>
              <Image
              source={{ uri: item.picture.thumbnail }}
              alt={item.email}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 10,
              }}
            />
              <Text>Nom: {itemModal.name.first} {itemModal.name.last}</Text>
              <Text>Email: {itemModal.email}</Text>
              <Text>Ville: {itemModal.location.city}</Text>
              <Text>Pays: {itemModal.location.country}</Text>
              <Button title="Fermer" onPress={() => setItemModal(null)} />
            </View>
          )}
        </View>
      </Modal>
      <FlatList
        data={userData}
        renderItem={renderProduct}
      />
    </View>
  );
};

export default Api;

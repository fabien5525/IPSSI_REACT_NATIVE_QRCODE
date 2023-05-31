import React, { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, Pressable } from 'react-native';

const Api = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://5525.fr:19001/user')
      .then((response) => response.json())
      .then((json) => setUserData(json))
      .catch((error) => console.error(error));
  }, []);

  //   interface User {
  //     gender: 'male' | 'female',
  //     name: {
  //         title: string,
  //         first: string,
  //         last: string
  //     },
  //     location: {
  //         street: {
  //             number: number,
  //             name: string
  //         },
  //         city: string,
  //         state: string,
  //         country: string,
  //         postcode: number,
  //         coordinates: {
  //             latitude: string,
  //             longitude: string
  //         },
  //         timezone: {
  //             offset: string,
  //             description: string
  //         },
  //     },
  //     email: string,
  //     login: {
  //         uuid: string,
  //         username: string,
  //         password: string,
  //         salt: string,
  //         md5: string,
  //         sha1: string,
  //         sha256: string
  //     },
  //     dob: {
  //         date: string,
  //         age: number
  //     },
  //     registered: {
  //         date: string,
  //         age: number
  //     },
  //     phone: string,
  //     cell: string,
  //     id: {
  //         name: string,
  //         value: string
  //     },
  //     picture: {
  //         large: string,
  //         medium: string,
  //         thumbnail: string
  //     },
  //     nat: string
  // }

  const renderProduct = ({ item, index }) => (
    <Pressable key={index}>
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

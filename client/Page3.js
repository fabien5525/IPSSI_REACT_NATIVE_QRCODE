import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Modal, FlatList, Pressable, Text } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function Cal() {
  const [title, setTitle] = useState(' '); const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [calendars, setCalendars] = useState([]);
  const [calendar, setCalendar] = useState(null);

  const prepareCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      setCalendars(calendars);
    }
  };

  useEffect(() => { prepareCalendar() }, []);

  const handleAddEvent = async () => {
    if (!calendar || !title || !startDate || !endDate || title === '') {
      return;
    }

    const event = {
      title: title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      timeZone: 'GMT', // Utilisation du fuseau horaire GMT
      location: '',
      alarms: [{
        relativeOffset: -30, // 30 minutes avant l'événement method: Calendar.AlarmMethod.ALERT,
      }],
    };
    const eventId = await Calendar.createEventAsync(calendar.id, event);
    if (eventId) {
      alert('Succès', 'Événement ajouté à l\'agenda !');
      setTitle('');
      setStartDate('');
      setEndDate('');
    } else {
      console.error('error add event', eventId);
    }
  };

  return (
    <View >
      <Modal
        visible={calendar ? false : true}
      >
        <View>
          <Text style={{
            flex: 1,
            flexWrap: "wrap",
            marginRight: 10,
            textAlign: "left",
            fontSize: 20,
          }}>Choisissez un calendrier</Text>
          <FlatList
            data={calendars}
            renderItem={({ index, item }) => (
              item.name && item.isVisible && <View key={index}>
                <Pressable onPress={() => setCalendar(item)}>
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
                    <View style={{
                      flex: 1,
                    }}>
                      <Text style={{
                        flex: 1,
                        flexWrap: "wrap",
                        marginRight: 10,
                        textAlign: "left",
                      }}>{item.name}</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
          />
        </View>
      </Modal>

      <TextInput
        placeholder="Titre de l'événement" value={title}
        onChangeText={setTitle}
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingStart: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        }}
      />
      <TextInput
        placeholder="Date de début (YYYY-MM-DD)" value={startDate}
        onChangeText={setStartDate}
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingStart: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        }}
      />
      <TextInput
        value={endDate}
        placeholder="Date de fin (YYYY-MM-DD)"
        onChangeText={setEndDate}
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingStart: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        }}
      />
      <View
        style={{
          //style for a button center 
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          margin: 10,
        }}>
        <Button
          title="Ajouter l'événement à l'agenda" onPress={handleAddEvent}

        />
      </View>
    </View>
  );
}
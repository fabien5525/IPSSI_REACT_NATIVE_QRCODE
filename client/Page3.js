import React, { useState } from 'react';
import { StyleSheet, View, Button,TextInput, } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function Cal() {
  const [title, setTitle] = useState(' '); const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const handleAddEvent = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      const event = {
        title: title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        timeZone: 'GMT', // Utilisation du fuseau horaire GMT
        location: '',
        alarms: [{relativeOffset: -30, // 30 minutes avant l'événement method: Calendar.AlarmMethod.ALERT,
        }],
      };
      const eventId = await Calendar.createEventAsync (defaultCalendar.id, event);
      if (eventId) {
        Alert.alert('Succès', 'Événement ajouté à l\'agenda !');
        setTitle('');
        setStartDate('');
        setEndDate('');
      } else {
        Alert.alert('Erreur');
      }
    } else {
        Alert.alert('Permission refuser');
    }
  };
  return (
    <View >
      <TextInput
        placeholder="Titre de l'événement" value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Date de début (YYYY-MM-DD)" value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        value={endDate}
        placeholder="Date de fin (YYYY-MM-DD)" 
        onChangeText={setEndDate}
      />
      <Button
        title="Ajouter l'événement à l'agenda" onPress={handleAddEvent}
      />
    </View>
  )
}
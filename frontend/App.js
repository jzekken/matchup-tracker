import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [opponent, setOpponent] = useState('');
  const [notes, setNotes] = useState('');

  const submitMatchup = async () => {
    try {
      // NOTE: If testing on a physical phone, replace 'localhost' with your computer's local IP address
      const response = await fetch('http://localhost:5000/api/matchups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerCharacter: 'Reina',
          opponentCharacter: opponent,
          result: 'Win', // Hardcoding for this quick test!
          notes: notes
        })
      });

      if (response.ok) {
        Alert.alert("Success", "Matchup data saved to MongoDB!");
        setOpponent('');
        setNotes('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iron Fist Tracker</Text>
      
      <Text style={styles.label}>Opponent Character:</Text>
      <TextInput 
        style={styles.input} 
        value={opponent} 
        onChangeText={setOpponent} 
        placeholder="e.g., King" 
      />

      <Text style={styles.label}>Matchup Notes:</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        value={notes} 
        onChangeText={setNotes} 
        placeholder="e.g., Duck the chain throw setup. Clean up electric execution on P2 side." 
        multiline 
      />

      <Button title="Log Matchup" onPress={submitMatchup} color="#6a0dad" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  }
});
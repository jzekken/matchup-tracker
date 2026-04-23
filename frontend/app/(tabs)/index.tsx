import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';

export default function App() {
  const [opponent, setOpponent] = useState('');
  const [notes, setNotes] = useState('');
  const [matchups, setMatchups] = useState([]); // State to hold your fetched notes

  // Fetch data from the database
  const fetchMatchups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/matchups');
      const data = await response.json();
      setMatchups(data);
    } catch (error) {
      console.error("Error fetching matchups:", error);
    }
  };

  // Run the fetch function when the app loads
  useEffect(() => {
    fetchMatchups();
  }, []);

  const submitMatchup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/matchups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerCharacter: 'Reina',
          opponentCharacter: opponent,
          result: 'Win', 
          notes: notes
        })
      });

      if (response.ok) {
        Alert.alert("Success", "Matchup logged!");
        setOpponent('');
        setNotes('');
        fetchMatchups(); // Refresh the list automatically after saving
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  // Design for each individual note card
  const renderMatchupCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.playerCharacter} vs {item.opponentCharacter}</Text>
      <Text style={styles.cardResult}>Result: {item.result}</Text>
      <Text style={styles.cardNotes}>{item.notes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iron Fist Tracker</Text>
      
      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput 
          style={styles.input} 
          value={opponent} 
          onChangeText={setOpponent} 
          placeholder="Opponent (e.g., Kazuya)" 
        />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          value={notes} 
          onChangeText={setNotes} 
          placeholder="Execution notes or optimal punishes..." 
          multiline 
        />
        <Button title="Log Matchup" onPress={submitMatchup} color="#6a0dad" />
      </View>

      {/* List Section */}
      <Text style={styles.subHeader}>Recent Sets</Text>
      <FlatList 
        data={matchups}
        keyExtractor={(item) => item._id}
        renderItem={renderMatchupCard}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 40, // Keeps it below the phone status bar
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6a0dad', // Purple accent
    elevation: 2, // Adds a tiny drop shadow on Android
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardResult: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  cardNotes: {
    fontSize: 14,
  }
});
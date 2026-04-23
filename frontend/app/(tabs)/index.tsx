import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [opponent, setOpponent] = useState('');
  const [notes, setNotes] = useState('');
  const [matchups, setMatchups] = useState([]);

  const fetchMatchups = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/matchups');
      const data = await response.json();
      setMatchups(data);
    } catch (error) {
      console.error("Error fetching matchups:", error);
    }
  };

  useEffect(() => {
    fetchMatchups();
  }, []);

  // --- PART 1: NEW DELETE FUNCTION ---
  const deleteMatchup = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/matchups/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMatchups(); // Refresh list after deleting
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

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
        fetchMatchups();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  // --- PART 2: UPDATED UI CARD WITH DELETE BUTTON ---
  const renderMatchupCard = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.playerCharacter} vs {item.opponentCharacter}</Text>
        <Text style={styles.cardResult}>Result: {item.result}</Text>
        <Text style={styles.cardNotes}>{item.notes}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteBtn} 
        onPress={() => deleteMatchup(item._id)}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IRON FIST TRACKER</Text>
      
      <View style={styles.inputSection}>
        <TextInput 
          style={styles.input} 
          value={opponent} 
          onChangeText={setOpponent} 
          placeholder="Opponent Character" 
          placeholderTextColor="#888"
        />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          value={notes} 
          onChangeText={setNotes} 
          placeholder="Execution notes or habits..." 
          placeholderTextColor="#888"
          multiline 
        />
        <Button title="LOG BATTLE" onPress={submitMatchup} color="#a020f0" />
      </View>

      <Text style={styles.subHeader}>BATTLE LOG</Text>
      <FlatList 
        data={matchups}
        keyExtractor={(item) => item._id}
        renderItem={renderMatchupCard}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

// --- PART 3: NEW DARK MODE STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a020f0',
    marginTop: 20,
    marginBottom: 10,
  },
  inputSection: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#a020f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardResult: {
    fontSize: 14,
    color: '#a020f0',
    marginBottom: 4,
  },
  cardNotes: {
    fontSize: 14,
    color: '#bbb',
  },
  deleteBtn: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  }
});
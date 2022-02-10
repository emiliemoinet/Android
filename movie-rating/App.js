import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MovieList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = useState([
    {
      id: 1,
      film: {
        titre: "Le discours d'un roi",
        note: "4",
        description: "le Roi George VI, suite à l’abdication de son frère Edouard VIII, incapable de s’exprimer en public, tentera de surmonter son handicap et d’affronter ses peurs pour assumer pleinement son rôle"
      }
    },
  ]);

  useFocusEffect(() => {
    if (!route.params.addElement) return;
    addElement(route.params.addElement);
    route.params.addElement = null;
  });

  const addElement = (film) => {
    setList((current) => [...current, { id: current.length, film: film }]);
  };

  return (
    <View style={styles.container}>
      <Text>Liste de Film</Text>
      <Button title="Ajouter" onPress={() => { navigation.navigate("Add"); }} />
      <ScrollView>
        {list.map((elm) => (
          <Text key={elm.id}>element: {elm.txt}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const addElement = () => {

  const navigation = useNavigation();

  const addElement = () => {
    const [titre, setTitre] = useState("");
    const [note, setNote] = useState(0);
    const [description, setDescription] = useState("");
    const [valid, setValid] = useState(false);
  }

  useEffect(() => {
    if (titre.length >= 2 && +note && note.length == 1 && description.length >= 10)
      setValid(true);
  }, [titre, note, description]);

  const note = (text) => {
    if ((+text || text == "") && (parseInt(text) <= 5 || text.length == 0))
      setNote(text);
  }

  return (
    <View style={styles.container}>
      <Text>Ajouter un film</Text>
      <View>
        <TextInput value={titre} placeholder='Titre du film' onChangeText={setTitre}></TextInput>
        <TextInput value={note} placeholder='Note du film' onChangeText={note} keyboardType='numeric'></TextInput>
        <TextInput value={description} placeholder='Description du film' onChangeText={setDescription} ></TextInput>
        <Button title='Ajouter' disabled={!valid} onPress={() => {
          navigation.navigate("Page principale", { addElement: { titre: titre, note: note, description: description } })
        }}></Button>
      </View>
      <StatusBar style='auto'></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createNativeStackNavigator();

const App = () => {

  const addElement = () => {
    const [titre, setTitre] = useState("");
    const [note, setNote] = useState(0);
    const [description, setDescription] = useState("");
    const [valid, setValid] = useState(false);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MovieList}
          initialParams={{ addElement: null }}
        />
        <Stack.Screen name="Add" component={addElement} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
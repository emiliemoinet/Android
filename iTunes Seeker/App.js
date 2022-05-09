import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addMusic, musicSelector, removeMusic } from './components/musicsSlice';
import store from "./store";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, size, color }) => {
                            let iconName;
                            if (route.name == "Search") {
                                iconName = "search";
                            } else if (route.name == "My playlist") {
                                iconName = "play-circle";
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: "#ff9000",
                        tabBarInactiveTintColor: "grey",
                    })}
                >
                    <Tab.Screen name="Search" component={SearchScreen} />
                    <Tab.Screen name="My playlist" component={PlaylistScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const PlaylistScreen = () => {
    const musics = useSelector(musicSelector);
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                contentInset={{ right: 0, top: 0, left: 0, bottom: 0 }}
                data={musics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Track {...item} />}
                ListFooterComponent={<View style={{ height: 150 }}></View>}
            ></FlatList>
        </View>
    );
}

const Track = ({ id, track }) => {
    const dispatch = useDispatch();
    const add = () => {
        dispatch(addMusic(track));
    };
    const remove = () => {
        dispatch(removeMusic(id));
    };

    const route = useRoute();

    const Btn = () => {
        if (route.name == "Search") {
            return (
                <Button
                    title="+"
                    onPress={add}
                />
            )
        } else {
            return (
                <Button
                    title="-"
                    onPress={remove}
                />
            )
        }
    }

    return (
        <View style={styles.track}>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#fff' }}>{track.title}</Text>
            <Text style={{ fontSize: 15, color: '#fff' }}>{track.artist}</Text>
            <Text style={{ fontSize: 10, color: '#fff' }}>{track.album}</Text>
            <Btn />
        </View>
    );
}

const SearchScreen = () => {
    const [value, setValue] = useState("");
    const [musics, setMusics] = useState([]);

    const search = () => {
        setValue('');
        fetch('https://itunes.apple.com/search?media=music&limit=10&term=' + value, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                let results = json.results;
                setMusics(results.map(filterResult))
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const filterResult = (result) => {
        return {
            id: result.trackId,
            track: {
                artist: result.artistName,
                title: result.trackName,
                album: result.albumName
            }
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{ fontSize: 20, marginBottom: 10 }}
                value={value}
                placeholder="Search a music"
                onChangeText={setValue}
            />
            <Button
                title="Search"
                onPress={search}
            />
            <FlatList
                style={styles.flatList}
                contentInset={{ right: 0, top: 0, left: 0, bottom: 0 }}
                data={musics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Track id={item.id} track={item.track} />}
                ListFooterComponent={<View style={{ height: 150 }}></View>}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
    },
    flatList: {
        marginVertical: 10
    },
    track: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#ff9000',
    },
});

export default App;
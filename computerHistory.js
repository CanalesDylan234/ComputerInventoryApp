import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebase';

// create a tab navigation instance to switch between checkin and checkout
const Tab = createBottomTabNavigator();

const ComputerHistoryPage = () => {
    return (
        // Set up the tab navigation with two tabs (checkin & checkout)
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'CheckedOut') {
                        iconName = focused ? 'arrow-down-circle' : 'arrow-down-circle-outline';
                    } else if (route.name === 'CheckedIn') {
                        iconName = focused ? 'arrow-up-circle' : 'arrow-up-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#CC0000',
                tabBarLabel: ({ color }) => {
                    let labelName;

                    if (route.name === 'CheckedOut') {
                        labelName = 'Checked Out';
                    } else if (route.name === 'CheckedIn') {
                        labelName = 'Checked In';
                    }

                    return <Text style={{ color }}>{labelName}</Text>;
                },
            })}
        >
            <Tab.Screen name="CheckedOut" component={CheckedOutScreen} />
            <Tab.Screen name="CheckedIn" component={CheckedInScreen} />
        </Tab.Navigator>
    );
};

// Component for the checkout tab (displays all checked out computers)
// Including changing the header name for consistency
const CheckedOutScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({ headerTitle: 'Checked-Out History' });
    }, []);

    return <CheckHistoryCollection collectionName="checkOutEmail" title="Checked-Out Computers and Lots" />;
};

// Component for the checkin tab (displays all checked out computers)
// Including changing the header name for consistency
const CheckedInScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({ headerTitle: 'Checked-In History' });
    }, []);

    return <CheckHistoryCollection collectionName="checkInEmail" title="Checked-In Computers and Lots" />;
};

// Component that fetches and displays the firebase collection of "checkoutEmail & checkinEmail"
// Receives the title from the document as well
const CheckHistoryCollection = ({ collectionName, title }) => {
    // States to hold the fetched data and string search query
    const [checkData, setCheckData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch the data from the firebase firestore when the component mounts/reads the collection name
    useEffect(() => {
        const fetchCheckData = async () => {
            try {
                // Retrieve all documents from the collections (checkoutEmail & checkinEmail)
                const querySnapshot = await firebase.firestore().collection(collectionName).get();
                // Map the data to extract the relevant information from both documents (checkoutEmail & checkinEmail)
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    email: doc.data().email,
                    firstname: doc.data().firstname,
                    lastname: doc.data().lastname,
                    scannedComputers: doc.data().scannedComputers,
                    timestamp: doc.data().timestamp.toDate().toString(),
                }));
                // Store the data in the called state
                setCheckData(data);
            } catch (error) {
                console.error(`Error fetching ${collectionName} data:`, error);
            }
        };
        // recall the fetch function to fetch the data
        fetchCheckData();
    }, [collectionName]);

    // Filter the checked data based on the search query
    const filteredCheckData = checkData.filter(item => {
        // Check if searchQuery is empty or matches any of the Computer/Lot IDs
        return (
            !searchQuery ||
            item.scannedComputers.some(computer => computer.data.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    return (
        <ScrollView>
            <View style={{ flex: 1, marginTop: 50 }}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by computer ID, EX: 'Computer-#'"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <View style={styles.container}>
                    {filteredCheckData.map(item => (
                        <Pressable style={styles.innerContainer} key={item.id}>
                            <Text style={styles.itemHeading}>Email: {item.email}</Text>
                            <Text style={styles.itemText}>First Name: {item.firstname}</Text>
                            <Text style={styles.itemText}>Last Name: {item.lastname}</Text>
                            <Text style={styles.itemText}>Scanned Computers:</Text>
                            {item.scannedComputers.map((computer, index) => (
                                <View key={index}>
                                    <Text style={styles.itemText}>Computer Data: {computer.data}</Text>
                                    <Text style={styles.itemText}>Computer Type: {computer.type}</Text>
                                    <Text style={styles.itemText}>Timestamp: {item.timestamp}</Text>
                                </View>
                            ))}
                        </Pressable>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ComputerHistoryPage

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    innerContainer: {
        flexDirection: 'column',
    },
    itemHeading: {
        fontWeight: 'bold',
    },
    itemText: {
        fontWeight: '300',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff', 
    },
});



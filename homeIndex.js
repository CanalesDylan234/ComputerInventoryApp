import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { firebase } from 'C:/Users/dylan/projects/Final-Project-expo-router/app/firebase.js';
import { Ionicons } from '@expo/vector-icons';

// Screens
import SettingsPage from '../settings/settingsPage';
import CheckitPage from '../checkit/checkitPage';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#CC0000',
        }}
    >
        <Tab.Screen // Home page Tab
            name="Home" 
            component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                ),
            }}
        />  
        <Tab.Screen // Check-It page Tab
        name="checkitPage" 
        component={CheckitPage} 
        options={{ 
            tabBarLabel: 'Check-It',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="checkmark-circle" color={color} size={size} />
            ),
            headerTitle: 'Check-It',
        }}
        />
        <Tab.Screen // Settings page Tab
        name="settingsPage" 
        component={SettingsPage} 
        options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
            ),
            headerTitle: 'Settings',
        }}
        />
    </Tab.Navigator>
    );
}

// Function component for the Home Screen 
const Home = () => {
    // State for user name
    const [name, setName] = useState({});
    // State for the email verification 
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    // Change the password for the user's choice
    const changePassword = () => {
        // Send a password reset email to the users email address using Firebases function
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("An email has been sent to change your password!");
        }).catch((error) => {
            alert(error);
        })
    }

    // useEffect hook for fetching the user's data and checking the email verification status
    useEffect(() => {
        // Listening for changes in authentication state
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                setIsEmailVerified(user.emailVerified); // Set email verification status
                firebase.firestore().collection('regUsers')
                    .doc(user.uid).get()
                    .then((snapshot) => {
                        if (snapshot.exists) {
                            const userData = snapshot.data();
                            console.log('User data:', userData);
                            setName(userData);
                        } else {
                            console.log('User data not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                console.log('No user is signed in');
            }
        });

        // Clean up listener to ensure that nothing is pending once function is complete
        return unsubscribe;
    }, []);

    // View page depending on whether the user has verified their email address or not so
    // depending on the user's verification this will eliminate fake accounts trying to gain access
    return (
        <SafeAreaView style={styles.container}>
            {isEmailVerified ? (
                <>
                    <Text style={styles.text}>
                        Hello, {name.firstName || 'User'}!
                    </Text>

                    <TouchableOpacity
                        onPress={() => {changePassword()}}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Change Current Password
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {firebase.auth().signOut()}}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Sign Out!
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.text}>
                    Please verify your email with the link sent. To update your status, 
                    close and reopen the application. Login again to ensure your account is verified.
                </Text>
            )}
        </SafeAreaView>
    )
}

// Main Home Index component
const App = () => {
    // State for email verification status
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    // State for loading the correct page 
    const [isLoading, setIsLoading] = useState(true);

    // useEffect hook will check for the email verification status of the user
    useEffect(() => {
        // Listening for changes in authentication state
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                setIsEmailVerified(user.emailVerified); // Set email verification status
            } else {
                console.log('No user is signed in');
            }
            // Set loading to false if email is not verified yet
            setIsLoading(false);
        });

        // Clean up listener to ensure that nothing is pending once function is complete
        return unsubscribe;
    }, []);

    // If loading, return null if the compnent returns true to avoid any premature rendering 
    if (isLoading) {
        return null;
    }

    // If user is verified after refreshing the application, then the homeIndex will be shown for traversal
    // If the user has registered and not verified yet, they will be redirected to the text below
    return (
        <>
            {isEmailVerified ? ( <TabNavigator /> 
            ) : (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.text}>
                    Please verify your email with the link sent. To update your status, 
                    close and reopen the application. Login again to ensure your account is verified.
                    </Text>
                </SafeAreaView>
            )}
        </>
    );
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 25,
        height: 50,
        width: 250,
        backgroundColor: '#CC0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonText: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

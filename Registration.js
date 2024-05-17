import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, Animated } from "react-native";
import React, { useState, useEffect } from 'react';
import { firebase } from 'C:/Users/dylan/projects/Final-Project-expo-router/app/firebase.js';
import { useNavigation } from "@react-navigation/native";


// Creating an animated value with an empty listener
const av = new Animated.Value(0);
av.addListener(() => {}); // Adding an empty listener to prevent the warning

const Registration = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user && registrationSuccess) {
                // User is signed in and registration is successful
                // Perform any additional actions (e.g., navigate to another screen)
                if (!user.emailVerified) {
                    Alert.alert('Email Verification Required!', 'Please verify with sent email!')
                } else {
                    Alert.alert('Success!', 'Registration Sucessful!')
                }
            }
        });
        
        return () => {
            unsubscribe(); // Clean up the listener when component unmounts
        };
    }, [registrationSuccess]); // Re-run this effect whenever registrationSuccess changes

    const isValidEmail = (email) => {
        return /^[^\s@]+@ttu\.edu$/.test(email);
    }

    const validatePassword = (password) => {
        // Expressions to check for a special character, capital letter, and a number 
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const capitalLetterRegex = /[A-Z]/;
        const  numberRegex = /[0-9]/;

        // Checks if password meets the required criteria
        const hasSpecialChar = specialCharRegex.test(password);
        const hasCapicalLetter = capitalLetterRegex.test(password);
        const hasNumber = numberRegex.test(password);

        // Return true if criteria has been met
        return hasSpecialChar && hasCapicalLetter && hasNumber;
    }

    const registerUser = async (email, password, firstName, lastName) => {
        if (!isValidEmail(email)) {
            Alert.alert("Please enter a valid TTU email address.");
            console.log('Invalid Email');
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert("Ensure password contains at least a special character, a capital letter, and a number");
            console.log('Invalid Password');
            return;
        }

        try {
            // Create account with firebase authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://practicedb-33604.firebaseapp.com',
            });

            await firebase.firestore().collection('regUsers').doc(userCredential.user.uid).set({
                email,
                firstName,
                lastName,
            });
            
            setRegistrationSuccess(true); // Set registration success flag
            // User data will be handled in the onAuthStateChanged listener
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.message);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 23 }}>
                Register Here!
            </Text>
            <View style={{ marginTop: 40 }}>
                {/* Input fields for first name, last name, email, password */}
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={styles.button}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                    Register
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center'
    },
    button: {
        marginTop: 35,
        height: 70,
        width: 250,
        backgroundColor: '#CC0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
});

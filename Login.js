import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Animated } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from 'C:/Users/dylan/projects/Final-Project-expo-router/app/firebase.js';

// Creating an animated value with an empty listener
const av = new Animated.Value(0);
av.addListener(() => {}); // Adding an empty listener to prevent the warning


const Login = () => {
        const navigation = useNavigation();
        const  [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const isValidEmail = (email) => {
            return /^[^\s@]+@ttu\.edu$/.test(email);
        }

        const loginUser = async (email, password) => {
            if (!isValidEmail(email)) {
                Alert.alert("Invalid Email", "Please enter a valid TTU email address.");
                console.log('Invalid Email');
                return;
            }

            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (error) {
                alert(error.message)
            }
        }
        
        // Forgot Password
        const forgetPassword = () => {
            // Check if the email field is empty is so, send the alert
            if (email.trim() === '') {
                Alert.alert('Please enter your email address before clicking on "Forgot Password"!');
                return;
            }
            // Send a password reset email to the provided email address using the Firebase function
            firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("An email has been sent to change your password!");
            }).catch((error) => {
                alert(error);
            })
        }
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 26}}>
                    Login
                </Text>

                <View style={{marginTop:40}}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => loginUser(email, password)}
                    style={styles.button}
                >
                    <Text style={{fontWeight: 'bold', fontSize: 22}}>Login!</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Registration')}
                    style={{marginTop:20}}
                >
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        Don't have an account? Register Now!
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {forgetPassword()}}
                    style={{marginTop:20}}
                >
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        Forgot Password? Click Here!
                    </Text>
                </TouchableOpacity>
            </View>
        )
}

export default Login


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
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#CC0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
})
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import emailjs from 'emailjs-com';

// Creating an animated value with an empty listener
const av = new Animated.Value(0);
av.addListener(() => {}); // Adding an empty listener to prevent the warning

const EmailMaintenancePage = () => {
    const navigation = useNavigation();

    // State for the issue text and character count
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [computer, setComputer] = useState('');
    const [issueText, setIssueText] = useState('');
    const maxCharacterLimit = 750;

    // Function to handle any text changes and character limits
    const handleTextChange = (text) => {
        if (text.length <= maxCharacterLimit) {
            setIssueText(text);
        }
    };

    const handleSubmit = () => {
        console.log('Submitted issue: ', issueText);

        // Send an email with EmailJS
        const serviceId = 'service_b2g06wn';
        const templateId = 'template_i9lolia';
        const publicKey = 'q0-5zmUTbUBih7gQx';

        const templateParams = {
            from_name: `${firstName} ${lastName}`,
            computer_type: computer,
            to_name: "Maintenance Team",
            message: issueText,
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully!', response);
                navigation.navigate('confirmMaintenance');
            })
            .catch((error) => {
                console.error('Error sending email: ', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={{textAlign: 'center', padding: 5, fontWeight: 500, fontSize: 15}}>
            Having issues with computers? Please list the affected computers and provide a brief description of the problem below.
            Ensure to include your Firstname and Lastname!
            </Text>
            <View style={styles.inputComputer}>
                <TextInput
                    style={styles.input}
                    placeholder="Firstname "
                    placeholderTextColor="black"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />
            </View>
            <View style={styles.inputComputer}>
                <TextInput
                    style={styles.input}
                    placeholder="Lastname"
                    placeholderTextColor="black"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />
            </View>
            <View style={styles.inputComputer}>
                <TextInput
                    style={styles.input}
                    placeholder="Computer-1, Computer-23, ..."
                    placeholderTextColor="black"
                    value={computer}
                    onChangeText={text => setComputer(text)}
                />
            </View>
            <View style={styles.inputContainter}>
                <TextInput
                    numberOfLines={5}
                    multiline
                    maxLength={maxCharacterLimit}
                    value={issueText}
                    placeholderTextColor="black"
                    onChangeText={handleTextChange}
                    placeholder="Type issues here..."
                    onSubmitEditing={() => Keyboard.dismiss()}
                    blurOnSubmit={true} 
                    style={styles.input}
                />
            </View>
            <Text>{`${issueText.length}/${maxCharacterLimit}`}</Text>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', textTransform: 'uppercase'}}>Submit Report</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

export default EmailMaintenancePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainter: {
        borderColor: '#CC0000',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: '80%',
        height: '25%',
        backgroundColor: '#F5F5F5',
    },
    inputComputer: {
        height: 40,
        borderColor: '#CC0000',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: '80%',
        backgroundColor: '#F5F5F5',
    },
    input: {
        flex: 1,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: "#CC0000",
        height: 40,
        width: 200,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});



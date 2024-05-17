import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { db, firebase } from '../../firebase';
import emailjs from 'emailjs-com';

const CheckOutDetailsPage = () => {
    const navigation = useNavigation();
    const  route = useRoute();

    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const { scannedBarcodes } = route.params;
    const barcodeList = scannedBarcodes.map((barcode, index) => `${index + 1}. Type: ${barcode.type}, Data: ${barcode.data}`).join('\n');

    const handleConfirmation = () => {
        // Add data to Firestore
        const checkOutCollection = db.collection('checkOutEmail');
        checkOutCollection.add({
            email,
            firstname,
            lastname,
            scannedComputers: scannedBarcodes.map(barcode => ({
                type: barcode.type,
                data: barcode.data
            })),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(docRef => {
            console.log('Document written with ID: ', docRef.id);
            // Sending email after successfully adding data to Firestore
            sendEmail();
        }).catch(error => {
            console.error('Error adding document: ', error);
        });
    };
    
    // Function to send email using EmailJS
    const sendEmail = () => {
        const serviceId = 'service_b2g06wn';
        const templateId = 'template_addkaso';
        const publicKey = 'q0-5zmUTbUBih7gQx';
    
        const templateParams = {
            from_name: firstname,
            to_name: "University Advising",
            from_email: email,
            to_email: email,
            message: 'Thank you for Checking-Out each Computer(s)/Lot(s)!.!.' + `\n\nScanned Computers: \n${barcodeList}`,
            from_lastname: lastname,
        };
    
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully!', response);
                navigation.navigate('checkOutConfirm'); // Navigate to email confirmation page
            })
            .catch((error) => {
                console.error('Error sending email: ', error);
            });
    };
    

    return (
        <View style={styles.container}>
            <View>
                <Text>
                    Please enter your TTU Email, Firstname, and Lastname below to confirm 
                    your check-out information with the admin!
                </Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="TTU Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Firstname"
                placeholderTextColor="black"
                value={firstname}
                onChangeText={text => setFirstName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Lastname"
                placeholderTextColor="black"
                value={lastname}
                onChangeText={text => setLastName(text)}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmation}>
                <Text style={{ fontSize: 18, color: 'white' }}>Submit</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

export default CheckOutDetailsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: '#CC0000',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: '80%',
        backgroundColor: '#F5F5F5',
    },
    confirmButton: {
        backgroundColor: "#CC0000",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
});

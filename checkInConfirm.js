import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const ConfirmCheckIn = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Thank you for checking in with us! An email will be sent to the admin soon
                to confirm your reservation! You may now go back to the dashboard.
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default ConfirmCheckIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});
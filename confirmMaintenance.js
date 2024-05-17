import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ConfirmMaintenance = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Maintenance Request has been sent to notify the Maintenance Team!</Text>
            <Text style={styles.text}>Your due dilligence means alot to us! You may now go back to the Dashboard.</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default ConfirmMaintenance;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
});


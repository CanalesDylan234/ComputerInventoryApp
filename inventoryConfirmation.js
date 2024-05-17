import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const ConfirmInventory = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Lots/Computers have been added to the inventory! You may now go back to the dashboard.</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default ConfirmInventory

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
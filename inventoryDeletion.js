import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const DeleteInventory = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Lots/Computers have been deleted from the inventory! You may now go back to the dashboard.</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default DeleteInventory

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
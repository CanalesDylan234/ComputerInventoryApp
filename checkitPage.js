import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckitPage = () => {
    const navigation = useNavigation();

    // Computers
    const goToInventoryAdditionPage = () => {
        navigation.navigate('inventoryAddition');
    };

    const goToCheckInPage = () => {
        navigation.navigate('checkinPage');
    };

    const goToCheckoutPage = () => {
        navigation.navigate('checkoutPage');
    };
    // Lots
    const goToCheckinLot = () => {
        navigation.navigate('checkinLot');
    };

    const goToCheckoutLot = () => {
        navigation.navigate('checkoutLot');
    };

    const goToInventoryAdditionLot = () => {
        navigation.navigate('inventoryLot');
    };
    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={{fontSize: 20, margin: 5, color: "#CC0000", textAlign: 'center'}}>Computer Confirmation Check</Text>

        <View>
            <TouchableOpacity
                onPress={goToCheckInPage} style={styles.button}
            >
                <Text style={styles.buttonText}>Check In a Computer!</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                onPress={goToCheckoutPage} style={styles.button}
            >
                <Text style={styles.buttonText}>Check Out a Computer!</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                onPress={goToInventoryAdditionPage} style={styles.button}
            >
                <Text style={{textTransform: 'uppercase', fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Edit the Computer Inventory!</Text>
            </TouchableOpacity>
        </View>

        <Text style={{fontSize: 20, marginBottom: 5, marginTop: 20, color: "#CC0000", textAlign: 'center'}}> Computer Lot Confirmation Check</Text>

        <View>
            <TouchableOpacity
                onPress={goToCheckinLot} style={styles.button}
            >
                <Text style={styles.buttonText}>Check In a Computer Lot!</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                onPress={goToCheckoutLot} style={styles.button}
            >
                <Text style={styles.buttonText}>Check Out a Computer Lot!</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                onPress={goToInventoryAdditionLot} style={styles.button}
            >
                <Text style={styles.buttonText}>Edit the Lot Inventory!</Text>
            </TouchableOpacity>
        </View>

        </View>
        </ScrollView>
    );
};

export default CheckitPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 17.5,
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
